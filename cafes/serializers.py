from rest_framework.serializers import ModelSerializer
from .models import Cafe, Event, MenuItem, Rating
from users.serializers import GetUserCommentSerializer

class RatingSerializer(ModelSerializer):
    user = GetUserCommentSerializer()
    class Meta: 
        model = Rating
        fields = '__all__'


class MenuItemSerializer(ModelSerializer):
    class Meta:
        model = MenuItem
        fields = '__all__'

class CafeSerializer(ModelSerializer):
    ratings = RatingSerializer(many=True)
    menu_item = MenuItemSerializer(many=True)

    class Meta: 
        model = Cafe
        fields = ['id', 'name', 'address', 'about', 'picture', 'ratings', 'menu_item']


class CafeListSerializer(ModelSerializer):
    ratings = RatingSerializer(many=True)

    class Meta: 
        model = Cafe
        fields = ['id', 'name', 'address', 'about', 'picture', 'ratings']


class EventSerializer(ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


    