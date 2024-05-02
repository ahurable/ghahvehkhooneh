from rest_framework.serializers import ModelSerializer
from .models import Cafe, Event, MenuItem, Rating, Club
from users.serializers import GetUserWithAnyProfileSerializer

class AllFieldsClubSerializer(ModelSerializer):
    class Meta:
        model = Club
        fields = '__all__'


class DetialedMembersClubSerializer(ModelSerializer):
    members = GetUserWithAnyProfileSerializer(many=True)
    class Meta:
        model = Club
        fields = '__all__'


class RatingSerializer(ModelSerializer):
    user = GetUserWithAnyProfileSerializer()
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
    club = AllFieldsClubSerializer()

    class Meta: 
        model = Cafe
        fields = ['id', 'name', 'address', 'about', 'picture', 'ratings', 'menu_item', 'club']




class CafeListSerializer(ModelSerializer):
    ratings = RatingSerializer(many=True)

    class Meta: 
        model = Cafe
        fields = ['id', 'name', 'address', 'about', 'picture', 'ratings']


class EventSerializer(ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


