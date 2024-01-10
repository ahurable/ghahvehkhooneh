from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from .serializers import CreateUserSerializer
# Create your views here.


class UserCreateView(APIView):
    
    def post(self, request):
        serializer = CreateUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'Success':'User has been created successfully'}, status=200)

        else:
            return Response({'error':'Something bad happened'}, status=200)


