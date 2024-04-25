from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.serializers import ModelSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import CreateUserSerializer, CustomUser as User, AvatarSerializer
from rest_framework.generics import UpdateAPIView
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
        

class UpdateAvatarView(UpdateAPIView):
    serializer_class = AvatarSerializer
    queryset = Profile.objects.all()

# class UpdateAvatarView(APIView):
#     permission_classes = [IsAuthenticated]
#     parser_classes = [FormParser,MultiPartParser]

#     class Serializer(ModelSerializer):
#         class Meta:
#             model = Profile
#             fields = ['avatar', 'user']

        

        

#     def put(self, request, format=None):
#         data = request.data
#         data['user'] = request.user.id
#         serializer = self.Serializer(data=data)
#         print(serializer)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"Something":"someg"})


        # return Response({'error': 'error occured'}, status=500)

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
    

