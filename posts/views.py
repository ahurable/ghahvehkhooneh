from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .serializers import SliderSerializer, PostSerializer, UserSerializer, Slider, User, Post
from rest_framework.permissions import AllowAny
from rest_framework import viewsets 
from rest_framework.response import Response
from django.shortcuts import get_object_or_404



# Create your views here.


class SlidersList(ListAPIView):

    queryset = Slider.objects.all()
    serializer_class = SliderSerializer
    permission_classes = [AllowAny]


class PostsList(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]

# class PostViewSet(viewsets.ViewSet):

#     def list(self, request):
#         qs = Post.objects.all()
#         serializer = PostSerializer(qs, many=True)
        

#         return Response(serializer.data)
    
#     def retrieve(self, request, pk):
#         qs = get_object_or_404(Post, pk=pk)
#         serializer = PostSerializer(qs)
#         return Response(serializer.data)