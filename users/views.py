from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.serializers import ModelSerializer
from rest_framework.parsers import FileUploadParser
from .serializers import CreateUserSerializer, CustomUser as User
from .models import Profile
# Create your views here.


# class UserCreateView(APIView):
    
#     def post(self, request):
#         serializer = CreateUserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({'Success':'User has been created successfully'}, status=200)

#         else:
#             return Response({'error':'Something bad happened'}, status=200)


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
        


class UpdateAvatarView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [FileUploadParser]

    class Serializer(ModelSerializer):
        class Meta:
            model = Profile
            fields = ['avatar']

    def post(self, request):
        serializer = self.Serializer(data=request.data)
        if serializer.is_valid():
            instance = Profile.objects.get(user__id = request.user.id)
            instance['avatar'] = serializer.data['avatar']
            instance.save()
            return Response({"success":"successful update avatar"}, status=200)
        



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
    

