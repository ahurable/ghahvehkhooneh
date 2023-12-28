from rest_framework.serializers import ModelSerializer
from .models import Slider

class SliderSerializer(ModelSerializer):
    class Meta:
        model = Slider
        fields = '__all__'