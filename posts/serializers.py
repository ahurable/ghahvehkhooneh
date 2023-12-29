from rest_framework.serializers import ModelSerializer
from .models import Slider, Post, User

class SliderSerializer(ModelSerializer):
    class Meta:
        model = Slider
        fields = '__all__'


class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'