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
from cafes.serializers import *
from cafes.models import *
from .models import Profile, CustomUser as User
from .permissions import IsAdminOfCafe
# Create your views here.



class UserCreateView(CreateAPIView):
    queryset = User.objects.all()
    permission_classes =  (AllowAny,)
    serializer_class = CreateUserSerializer




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
            instance = Profile.objects.get(user__username=request.user.username)
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
    queryset = Profile.objects.all()


class ProfileInformation(APIView):
    permission_classes = [IsAuthenticated]
    class ProfileSerializer(ModelSerializer):
        class Meta:
            model = Profile
            fields = '__all__'



    def get(self, request):
        
            
        profile = Profile.objects.get(user__username=request.user.username)
        profile_serializer = self.ProfileSerializer(profile)
        return Response({'profile':profile_serializer.data}, status=200)
    

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


# @api_view(['POST'])
# def offerHobbyHook(request):
#     serializer = HobbySerializer(data=request.data)
#     if serializer.is_valid():
#         print(serializer.data['name'])
#         instance = Hobby.objects.all().filter(name__contains=serializer.data['name'])
#         serialized_response = HobbySerializer(instance, many=True)
#         return Response(serialized_response.data)
        


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def addHobbyHook(request):
#     serializer = HobbySerializer(data=request.data)
#     if serializer.is_valid():
#         validated_data = serializer.data
#         hobby_instance = Hobby.objects.get_or_create(name=validated_data['name'])
#         personality_instance = Personality.objects.get_or_create(user=request.user)
#         personality_instance[0].hobbies.add(hobby_instance[0].id)
#         return Response({'success':'u added hobby with successfully'}, status=200)
    


# @api_view(['POST'])
# def offerJobHook(request):
#     serializer = JobSerializer(data=request.data)
#     if serializer.is_valid():
#         instance = Job.objects.all().filter(name__contains=serializer.data['name'])
#         serialized_response = JobSerializer(instance, many=True)
#         return Response(serialized_response.data)
#     return Response({'job':'job does not exists'}, status=404)
        


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def addJobHook(request):
#     serializer = JobSerializer(data=request.data)
#     if serializer.is_valid():
#         validated_data = serializer.data
#         job_instance = Job.objects.get_or_create(name=validated_data['name'])
#         personality_instance = Personality.objects.get_or_create(user=request.user)
#         personality_instance[0].job.add(job_instance[0].id)
#         return Response({'success':'u added hobby with successfully'}, status=200)
    


# @api_view(['POST'])
# def offerMusicGenreHook(request):
#     serializer = MusicGenreSerializer(data=request.data)
#     if serializer.is_valid():
#         instance = MusicGenre.objects.all().filter(name__contains=serializer.data['name'])
#         serialized_response = JobSerializer(instance, many=True)
#         return Response(serialized_response.data)
#     # return Response({'job':'job does not exists'}, status=404)
        


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def addMusicGenreHook(request):
#     serializer = MusicGenreSerializer(data=request.data)
#     if serializer.is_valid():
#         validated_data = serializer.data
#         genre_instance = MusicGenre.objects.get_or_create(name=validated_data['name'])
#         personality_instance = Personality.objects.get_or_create(user=request.user)
#         personality_instance[0].music_taste.add(genre_instance[0].id)
#         return Response({'success':'u added hobby with successfully'}, status=200)
    


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


    def post(self, request, cafeid):
        cafe = Cafe.objects.get(id=cafeid)
        print(request.data)
        serializer = self.Serializer(data=request.data)
        # print(request.data['picture'])
        if serializer.is_valid():
            # print(serializer.data)
            menu_instance = MenuItem()
            menu_instance.item = serializer.data['item']
            menu_instance.description = serializer.data['description']
            menu_instance.picture = request.data['picture']
            menu_instance.price = serializer.data['price']
            menu_instance.cafe = cafe
            menu_instance.save()
            
            if serializer.data['category'] != 'default':
                menu_instance.category.set(serializer.data['category'])
                menu_instance.save()

            return Response({'success':"menu item added with successfully"}, status=201)
            


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
        class Meta:
            model = Club
            fields = ['name', 'description', 'club_avatar', 'cafe']

    queryset = Club.objects.all()
    
    serializer_class = Serializer

    
    

class AdminMembersClub(APIView):
    permission_classes = [IsAuthenticated, IsAdminOfCafe]
    def get(self, request, cafeid):
        club = Club.objects.get(cafe__id=cafeid)
        u_serializer = GetUserWithAnyProfileSerializer(club.members, many=True)
        return Response(u_serializer.data)
    

class UpdateCafeBanner(UpdateAPIView):
    
    class Serializer(ModelSerializer):
        class Meta:
            model = Cafe
            fields = ['picture']
    lookup_field = 'id'
    permission_classes = [IsAdminOfCafe]
    serializer_class = Serializer
    queryset = Cafe.objects.all()