from rest_framework.serializers import ModelSerializer
from .models import Cafe, Event, MenuItem, Rating, Club, CategoryFood
from rest_framework import serializers
from users.serializers import GetUserWithAnyProfileSerializer



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




class CafeListSerializer(ModelSerializer):
    ratings = RatingSerializer(many=True)

    class Meta: 
        model = Cafe
        fields = ['id', 'name', 'address', 'about', 'picture', 'ratings']


class CafeNameSerializer(ModelSerializer):
    class Meta:
        model = Cafe
        fields = ['id', 'name']


class ClubSerializer(ModelSerializer):
    members = GetUserWithAnyProfileSerializer(many=True)
    class Meta:
        model = Club
        fields = '__all__'

class EventSerializer(ModelSerializer):
    club = ClubSerializer()
    cafe = CafeNameSerializer()
    class Meta:
        model = Event
        fields = '__all__'

class AllFieldsClubSerializer(ModelSerializer):
    members = GetUserWithAnyProfileSerializer(many=True)
    events = EventSerializer(many=True)
    class Meta:
        model = Club
        fields = '__all__'


class CategorySerializer(ModelSerializer):
    items = MenuItemSerializer(many=True)
    class Meta:
        model = CategoryFood
        fields = ['id', 'name', 'items']


class CafeSerializer(ModelSerializer):
    ratings = RatingSerializer(many=True)
    categories = CategorySerializer(many=True)
    club = AllFieldsClubSerializer()

    class Meta: 
        model = Cafe
        fields = ['id', 'name', 'address', 'about', 'picture', 'ratings', 'categories', 'club']




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

