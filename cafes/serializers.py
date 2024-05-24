from rest_framework.serializers import ModelSerializer
from .models import Cafe, Event, MenuItem, Rating, Club
from rest_framework import serializers
from users.serializers import GetUserWithAnyProfileSerializer

class AllFieldsClubSerializer(ModelSerializer):
    members = GetUserWithAnyProfileSerializer(many=True)
    class Meta:
        model = Club
        fields = '__all__'


class SmallDetailedClubSerializer(ModelSerializer):
    class Meta:
        model = Club
        fields = ['id', 'name', 'club_avatar']

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


class CafeNameSerializer(ModelSerializer):
    class Meta:
        model = Cafe
        fields = ['id', 'name']


class EventSerializer(ModelSerializer):
    cafe = CafeNameSerializer()
    club = AllFieldsClubSerializer()
    class Meta:
        model = Event
        fields = '__all__'


class DetailedEventSerializer(ModelSerializer):
    club = AllFieldsClubSerializer()
    cafe = CafeNameSerializer()
    participents = GetUserWithAnyProfileSerializer(many=True)
    created_by = GetUserWithAnyProfileSerializer()
    class Meta:
        model = Event
        fields = '__all__'




class CreateEventSerializer(ModelSerializer):
    class Meta:
        model = Event
        fields = ['name', 'description', 'club', 'cafe', 'created_by']

