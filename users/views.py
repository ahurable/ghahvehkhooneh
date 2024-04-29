from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.serializers import ModelSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import CreateUserSerializer, CustomUser as User, AvatarSerializer, GetUserCommentSerializer, GetAllUsersInAreaSerializer
from rest_framework.generics import UpdateAPIView
from django.shortcuts import get_object_or_404
from .models import Profile
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
        serializer = GetUserCommentSerializer(instance)
        
        return Response(serializer.data, status=200)


class GetAllUsers(APIView):

    def get(self, request):
        instance = User.objects.all()
        serializer = GetAllUsersInAreaSerializer(instance, many=True)
        return Response(serializer.data, status=200)
    

class FollowRequestView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, id):
        instance = User.objects.get(id=id)
        profile = Profile.objects.get(user__id=request.user.id)
        profile.following.add(instance)
        Profile.objects.get(user=instance).following.add(instance)

        return Response({'success':'u added a user successfully to your followings'}, status=200)