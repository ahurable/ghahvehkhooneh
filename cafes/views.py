from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import CreateAPIView
from rest_framework.serializers import ModelSerializer
from .serializers import CafeSerializer
from .models import Cafe
# Create your views here.


class CafeListView(APIView): 
    permission_classes = (AllowAny, )
    def get(self, request):
        
        serializer = CafeSerializer(Cafe.objects.all(), many=True)
        return Response(serializer.data, status=200)
    


class CafeView(APIView):
    permission_classes = (AllowAny, )
    def get(self, request, pk):
        serializer = CafeSerializer(Cafe.objects.get(id=pk))
        return Response(serializer.data, status=200)
    

class AddCafeView(CreateAPIView):
    queryset = Cafe.objects.all()
    serializer_class = CafeSerializer
    permission_classes = (IsAuthenticated,)
        