from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from .serializers import CreateUserSerializer, User
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