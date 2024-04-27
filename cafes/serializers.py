from rest_framework.serializers import ModelSerializer
from .models import Cafe, Event, MenuItem


class CafeSerializer(ModelSerializer):
    class Meta:
        model = Cafe
        fields = ['id', 'name', 'about', 'picture']


class EventSerializer(ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class MenuItemSerializer(ModelSerializer):
    class Meta:
        models = MenuItem
        fields = '__all__'
    