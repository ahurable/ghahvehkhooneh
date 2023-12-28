from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .serializers import SliderSerializer, Slider
from rest_framework.permissions import AllowAny
# Create your views here.


class SlidersList(ListAPIView):

    queryset = Slider.objects.all()
    serializer_class = SliderSerializer
    permission_classes = [AllowAny]