from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.serializers import ModelSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import *
from rest_framework.generics import UpdateAPIView
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from .models import Profile, Hobby, Personality, CustomUser as User
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
    class Serializer(ModelSerializer):
        class Meta:
            model = Profile
            fields = '__all__'


    def get(self, request):
        
        profile = Profile.objects.get(user__username=request.user.username)
        serializer = self.Serializer(profile)
        return Response(serializer.data, status=200)
    

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
        


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addHobbyHook(request):
    serializer = HobbySerializer(data=request.data)
    if serializer.is_valid():
        validated_data = serializer.data
        hobby_instance = Hobby.objects.get_or_create(name=validated_data['name'])
        personality_instance = Personality.objects.get(user__id=request.user.id)
        personality_instance.hobbies.add(hobby_instance[0].id)
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
        personality_instance = Personality.objects.get(user__id=request.user.id)
        personality_instance.job.add(job_instance[0].id)
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
        personality_instance = Personality.objects.get(user__id=request.user.id)
        personality_instance.music_taste.add(genre_instance[0].id)
        return Response({'success':'u added hobby with successfully'}, status=200)