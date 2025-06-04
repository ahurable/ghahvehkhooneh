from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.serializers import ModelSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import *
from rest_framework.generics import UpdateAPIView, CreateAPIView
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist   
from cafes.serializers import *
from cafes.models import *
from .models import Profile, CustomUser as User
from .permissions import IsAdminOfCafe
from .utls import generate_otp
import requests
# Create your views here.



class SendOTPView(APIView):
    """
    ارسال کد OTP به شماره موبایل کاربر
    """
    def post(self, request):
        phone_number = request.data.get('phone_number')

        if not phone_number:
            return Response(
                {'error': 'شماره موبایل الزامی است'},
                status=status.HTTP_400_BAD_REQUEST
            )
        

        if phone_number.startswith('0'):
            phone = [x for x in phone_number]
            phone.pop(0)
            phone = ''.join(phone)
            phone_number = phone


        if phone_number.startswith('+98') == False:
            phone_number = "+98"+phone_number
        
        
        try:
            # First try to get existing user
            user = CustomUser.objects.get(phone_number=phone_number)
        except CustomUser.DoesNotExist:
            try:
                # If doesn't exist, create new user
                user = CustomUser.objects.create_user(phone_number=phone_number)
            except IntegrityError:
                # Handle race condition if user was created by another request
                user = CustomUser.objects.get(phone_number=phone_number)
        
        # تولید و ذخیره کد OTP
        otp_code = user.generate_otp()
        
        # ارسال کد به کاربر (در محیط واقعی این خط باید فعال شود)
        # send_otp_sms(user.phone_number, otp_code)
        print(f"کد OTP برای {phone_number}: {otp_code}")  # فقط برای تست
        
        return Response(
            {'message': 'کد تأیید ارسال شد', 'phone_number': phone_number},
            status=status.HTTP_200_OK
        )


class VerifyOTPLoginView(APIView):
    """
    تأیید کد OTP و انجام عملیات ثبت‌نام/لاگین
    """
    def post(self, request):
        phone_number = request.data.get('phone_number')
        otp_code = request.data.get('otp_code')
        if not phone_number:
            return Response(
                {'error': 'شماره موبایل الزامی است'},
                status=status.HTTP_400_BAD_REQUEST
            )
        

        if phone_number.startswith('0'):
            phone = [x for x in phone_number]
            phone.pop(0)
            phone = ''.join(phone)
            phone_number = phone


        if phone_number.startswith('+98') == False:
            phone_number = "+98"+phone_number
        
        
        if not phone_number or not otp_code:
            return Response(
                {'error': 'شماره موبایل و کد تأیید الزامی هستند'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = CustomUser.objects.get(phone_number=phone_number)
        except CustomUser.DoesNotExist:
            return Response(
                {'error': 'کاربری با این شماره موبایل یافت نشد'},
                status=status.HTTP_204_NO_CONTENT
            )

        # بررسی اعتبار کد OTP
        if not user.is_otp_valid(otp_code):
            return Response(
                {'error': 'کد تأیید نامعتبر یا منقضی شده است'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # تایید کاربر
        user.verify_user()
        
        # اگر کاربر نیاز به تنظیم رمز عبور دارد (اختیاری)
        # if not user.has_usable_password():
        #     return Response(
        #         {
        #             'message': 'لطفا رمز عبور خود را تنظیم کنید',
        #             'phone_number': phone_number,
        #             'set_password': True
        #         },
        #         status=status.HTTP_200_OK
        #     )

        # تولید توکن JWT (اگر از djangorestframework-simplejwt استفاده می‌کنید)
        from rest_framework_simplejwt.tokens import RefreshToken
        
        refresh = RefreshToken.for_user(user)
        
        return Response(
            {
                'message': 'ورود با موفقیت انجام شد',
                'phone_number': phone_number,
                'is_verified': user.is_verified,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            },
            status=status.HTTP_200_OK
        )


# class UserCreateView(CreateAPIView):
#     queryset = User.objects.all()
#     permission_classes =  (AllowAny,)
#     serializer_class = CreateUserSerializer




class SetUpdateFirstNameLastNameBioView(APIView):

    permission_classes = [IsAuthenticated]

    class Serializer(ModelSerializer):
        class Meta:
            model = Profile
            fields = ['first_name', 'last_name', 'bio']

    def post(self, request):
        # print(request.data)
        serializer = self.Serializer(data=request.data)
        if serializer.is_valid():
            print(serializer)
            print(request.user)
            instance = Profile.objects.get(user__phone_number=request.user.phone_number)
            instance.first_name = serializer.data['first_name']
            instance.last_name = serializer.data['last_name']
            instance.bio = serializer.data['bio']
            instance.save()
            return Response({"success":"You edited your profile successfully"}, status=200)
        else:
            return Response({'error':"the data is not valid"}, status=400)
        

class UpdateAvatarView(UpdateAPIView):
    serializer_class = AvatarSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        """Ensure the profile being updated belongs to the authenticated user."""
        return get_object_or_404(Profile, user=self.request.user)


class ProfileInformation(APIView):
    permission_classes = [IsAuthenticated]
    class ProfileSerializer(ModelSerializer):
        class Meta:
            model = Profile
            fields = '__all__'



    def get(self, request):
        
        # print(request.user)
        profile = Profile.objects.get(user__phone_number=request.user.phone_number)
        personality = Personality.objects.get(user__phone_number=request.user.phone_number)
        personality_serializer = PersonalitySerializer(personality)
        profile_serializer = self.ProfileSerializer(profile)
        return Response({'profile':profile_serializer.data, 'personality': personality_serializer.data}, status=200)
    

# hooks 

class GetAnyProfileInformation(APIView):


    def get(self, request, id):
        instance = get_object_or_404(User, id=id)
        serializer = GetUserWithAnyProfileSerializer(instance)
        
        return Response(serializer.data, status=200)


class GetAllUsers(APIView):

    def get(self, request):
        try:
            instance = User.objects.all().filter(profile__city = request.user.profile.city) 
        except:
            instance = User.objects.all() 
        serializer = GetAllUsersInAreaSerializer(instance, many=True)
        return Response(serializer.data, status=200)
    

class FollowRequestView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, id):
        instance = User.objects.get(id=id)
        profile = Profile.objects.get(user__id=request.user.id)
        profile.following.add(instance)
        Profile.objects.get(user=instance).followers.add(request.user)

        return Response({'success':'u added a user successfully to your followings'}, status=200)
    


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def unfollowRequestView(request, id):
    instance = User.objects.get(id=id)
    profile = Profile.objects.get(user__id=request.user.id)
    if instance in profile.following.all():
        profile.following.remove(instance)
        Profile.objects.get(id=id).followers.remove(request.user)
        return Response({'success':'user has removed from your followings with successfully'}, status=200)


@api_view(['POST'])
def offerHobbyHook(request):
    serializer = HobbySerializer(data=request.data)
    if serializer.is_valid():
        print(serializer.data['name'])
        instance = Hobby.objects.all().filter(name__contains=serializer.data['name'])
        serialized_response = HobbySerializer(instance, many=True)
        return Response(serialized_response.data)
        

@api_view(['GET'])
def getAllCities(request):
    cities = City.objects.all()
    serializer = CityListSerializer(cities,many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addHobbyHook(request):
    serializer = HobbySerializer(data=request.data)
    if serializer.is_valid():
        validated_data = serializer.data
        hobby_instance = Hobby.objects.get_or_create(name=validated_data['name'])
        personality_instance = Personality.objects.get_or_create(user=request.user)
        personality_instance[0].hobbies.add(hobby_instance[0].id)
        return Response({'success':'u added hobby with successfully'}, status=200)
    


@api_view(['POST'])
def offerJobHook(request):
    serializer = JobSerializer(data=request.data)
    if serializer.is_valid():
        instance = Job.objects.all().filter(name__contains=serializer.data['name'])
        serialized_response = JobSerializer(instance, many=True)
        return Response(serialized_response.data)
    return Response({'job':'job does not exists'}, status=404)
        


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addJobHook(request):
    serializer = JobSerializer(data=request.data)
    if serializer.is_valid():
        validated_data = serializer.data
        job_instance = Job.objects.get_or_create(name=validated_data['name'])
        personality_instance = Personality.objects.get_or_create(user=request.user)
        personality_instance[0].job.add(job_instance[0].id)
        return Response({'success':'u added hobby with successfully'}, status=200)
    


@api_view(['POST'])
def offerMusicGenreHook(request):
    serializer = MusicGenreSerializer(data=request.data)
    if serializer.is_valid():
        instance = MusicGenre.objects.all().filter(name__contains=serializer.data['name'])
        serialized_response = JobSerializer(instance, many=True)
        return Response(serialized_response.data)
    # return Response({'job':'job does not exists'}, status=404)
        


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addMusicGenreHook(request):
    serializer = MusicGenreSerializer(data=request.data)
    if serializer.is_valid():
        validated_data = serializer.data
        genre_instance = MusicGenre.objects.get_or_create(name=validated_data['name'])
        personality_instance = Personality.objects.get_or_create(user=request.user)
        personality_instance[0].music_taste.add(genre_instance[0].id)
        return Response({'success':'u added hobby with successfully'}, status=200)
    


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def adminAPIView(request):
    user = User.objects.get(id=request.user.id)
    if user.cafes.all().count() == 0:
        return Response({'denied':'access denied'}, status=404)
    else:
        serializer = CafeListSerializer(user.cafes.all(), many=True)
        return Response(serializer.data)
    

class AdminGetCafeAPIView(APIView):

    permission_classes = [IsAuthenticated, IsAdminOfCafe]

    def get(self, request, id):
        try:
            cafe = get_object_or_404(Cafe, id=id)
        
            cafe_serialzier = CafeSerializer(cafe)
            return Response(cafe_serialzier.data)
        except cafe.DoesNotExist:
            return Response({'error':'object does not exists'}, status=404)
        


class AddMenuItem(APIView):

    permission_classes = [IsAuthenticated, IsAdminOfCafe]
    parser_classes = [MultiPartParser]
    
    class Serializer(serializers.ModelSerializer):
        class Meta:
            model = MenuItem
            fields = ['item', 'description', 'picture', 'price', 'category']
       
    class CategorySerializer(serializers.ModelSerializer):
        class Meta:
            model = CategoryFood
            fields = ['id', 'name']


    def get(self, request, cafeid):
        food_cats = CategoryFood.objects.all()
        serializer = self.CategorySerializer(food_cats, many=True)
        return Response(serializer.data)


    def post(self, request, categoryid, cafeid):
        cat = CategoryFood.objects.get(id=categoryid)
        mutable_data = request.data.copy()
        mutable_data['category'] = categoryid
        serializer = self.Serializer(data=mutable_data)
        # print(request.data['picture'])
        if serializer.is_valid():
            serializer.save()
            return Response({'success':"menu item added with successfully"}, status=201)
        
        else:
            return Response({'error': 'make sure'}, status=400)


class ProfileDetails(APIView):
    def get(self, request, username):
        # try:
            user = User.objects.get(username=username)
            u_serializer = GetUserWithAnyProfileSerializer(user)
            return Response({'user':u_serializer.data})

        # except:
        #     return Response({'notfound':'user not found'}, status=404)


@api_view(['POST', 'GET'])
def getCitiesNames(request):
    class CSerializer(ModelSerializer):
        class Meta:
            model = City
            fields = ['id', 'name']

    cities = City.objects.all()
    c_serializer = CSerializer(cities, many=True)
    return Response(c_serializer.data)


class AddClubView(CreateAPIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAdminOfCafe]

    class Serializer(serializers.ModelSerializer):
        admin= UserSerializer
        class Meta:
            model = Club
            fields = ['name', 'description', 'club_avatar', 'cafe', 'admin']
        def create(self, validated_data):
            # print(validated_data['admin'][0].id)
            user_admin = User.objects.get(id=validated_data['admin'][0].id)
            club = Club(
                name=validated_data['name'],
                description=validated_data['description'],
                club_avatar=validated_data['club_avatar'],
                cafe=validated_data['cafe']
            )
            club.save()
            club.admin.add(user_admin.id)
            club.save()
            return club
        
    queryset = Club.objects.all()

    def get_serializer(self, *args, **kwargs):
        data = self.request.data
        data['admin'] = self.request.user.id
        # print(data)
        serializer = self.Serializer(data=data)
        return serializer

    # def create(self, request, *args, **kwargs):
    #     data = request.data
    #     data['admin'] = request.user.id
    #     print(data)
    #     serializer = self.Serializer(data=data)
    #     serializer.is_valid(raise_exception=True)
    #     print(serializer)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=201, headers=headers)


class AdminMembersClub(APIView):
    permission_classes = [IsAuthenticated, IsAdminOfCafe]
    def get(self, request, cafeid):
        club = Club.objects.get(cafe__id=cafeid)
        u_serializer = GetUserWithAnyProfileSerializer(club.members, many=True)
        return Response(u_serializer.data)
    

class AddCafePicturesView(CreateAPIView):
    class Serializer(ModelSerializer):
        class Meta:
            model = Picture  # Update the model to Picture since you're adding pictures
            fields = ['picture']

        def create(self, validated_data):
            cafe_id = self.context.get('id')  # Retrieve 'id' from context
            cafe = Cafe.objects.get(id=cafe_id)  # Get the existing Cafe instance
            
            pictures = self.context['request'].FILES.getlist('pictures')  # Retrieve pictures
            picture_instances = [
                Picture(cafe=cafe, picture=picture) for picture in pictures
            ]
            Picture.objects.bulk_create(picture_instances)  # Efficiently save all pictures

            return cafe  # Return the updated Cafe instance (optional, for confirmation)


    lookup_field = 'id'
    permission_classes = [IsAdminOfCafe]
    serializer_class = Serializer
    queryset = Cafe.objects.all()
    def get_serializer_context(self):
        # Add request to the serializer context
        context = super().get_serializer_context()
        print(self.request.data)
        context['request'] = self.request
        context['id'] = self.kwargs.get('id')
        return context
    

class UpdateBanners(APIView):
    permission_classes = [IsAuthenticated, IsAdminOfCafe]
    def get(self, request, cafeid):
        pictures = Picture.objects.all().filter(cafe__id = cafeid)
        ser = PictureSerializer(pictures, many=True)
        return Response(ser.data)
    
    def delete(self, request, cafeid):
        picture_id = request.data['picture_id']
        if not picture_id: 
            return Response({"error": "Missing picture_id"}, status=status.HTTP_400_BAD_REQUEST)

        picture = get_object_or_404(Picture, id=picture_id, cafe__id=cafeid)
        picture.delete()
        return Response({"message": "Picture deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


class UpdateCafeDescription(UpdateAPIView):


    class Serializer(ModelSerializer):
        class Meta: 
            model = Cafe
            fields = ['about']

    permission_classes = [IsAuthenticated, IsAdminOfCafe]
    lookup_field = 'id'
    serializer_class = Serializer
    queryset = Cafe.objects.all()


class UpdateItem(UpdateAPIView):

    class Serializer(ModelSerializer):
        class Meta:
            model = MenuItem
            fields = ['item', 'description', 'price']

    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'
    serializer_class = Serializer
    queryset = MenuItem.objects.all()

    




class CreateCategoryView(APIView):
    class Serializer(ModelSerializer):
        class Meta:
            model = CategoryFood
            fields = ['name']
    permission_classes = [IsAdminOfCafe]
    def post(self, request, cafeid):
        cafe = Cafe.objects.get(id=cafeid)
        print(request.data)
        serializer = self.Serializer(data=request.data)
        if serializer.is_valid():
            cat = CategoryFood(name=serializer.data['name'], cafe=cafe)
            cat.save()
            return Response({'name': serializer.data['name']}, status=201)
        
import re

class SetLocationCafe(APIView):
    permission_classes = [IsAuthenticated, IsAdminOfCafe]
    class Serializer(serializers.ModelSerializer):
        class Meta:
            model = Cafe
            fields = ['location']
        def validate_location(self, value):
            """
            Validate that the input is a valid Google Maps location format.
            Example: "37.7749,-122.4194" (latitude,longitude)
            """
            google_location_pattern = r'^https?://maps\.app\.goo\.gl/[A-Za-z0-9]+$'
            if not re.match(google_location_pattern, value):
                raise serializers.ValidationError("Invalid Google Maps location format.")
            return value
    def post( self, request, cafeid ):
        try:
            cafe = Cafe.objects.get(id=cafeid)  # Fetch the cafe by ID
        except ObjectDoesNotExist:
            return Response({"error": "Cafe not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.Serializer(data=request.data)
        if serializer.is_valid():
            cafe.location = serializer.validated_data['location']
            cafe.save()
            return Response({"message": "Location updated successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class GetCategoryView(APIView):
    permission_classes = [IsAuthenticated, IsAdminOfCafe]
    def get(self, request, categoryid, cafeid):
        try:
            category = CategoryFood.objects.get(id=categoryid)
            c_serializer = CategorySerializer(category)
            return Response(c_serializer.data)
        except CategoryFood.DoesNotExist:
            return Response({'error' : 'does not exists'}, status=404)

class DeleteCategoryView(APIView):
    permission_classes = [IsAdminOfCafe, IsAuthenticated]
    def delete(self, request, cafeid, category_id):
        try:
            CategoryFood.objects.get(id=category_id).delete()
            return Response({'success':'deleted'}, status=201)
        except:
            return Response({'error':'some error happened'}, status=400)
        


class RequestOTPView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = OTPRequestSerializer(data=request.data)
        if serializer.is_valid():
            phone_number = serializer.validated_data["phone_number"]
            # print(phone_number)
            user = CustomUser.objects.get(phone_number=phone_number)
            verification_code = user.otp_code

            if phone_number.startswith("+98"):
                phone_number = "0" + phone_number[3:] 
            print(phone_number)
            # Send OTP via SMS (Placeholder - Use Twilio, Firebase, etc.)
            print(f"OTP for {phone_number}: {verification_code}")
            url = "https://api.mediana.ir/sms/v1/send/otp"
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {os.getenv('MEDIANA_KEY')}",
            }
            data = {
                "type": "Informational",
                "recipient": phone_number,
                "otpCode": f"{verification_code}",
            }

            response = requests.post(url, json=data, headers=headers)
            print(response)
            print(response.status_code)
            print(response.json())
            if response.status_code == 200:
                return Response({"message": "کد تأیید ارسال شد.", "code": verification_code}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "ارسال پیامک ناموفق بود.", "details": response.text}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            # return Response({"message": "OTP sent successfully."}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class VerifyOTPView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = OTPVerifySerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
