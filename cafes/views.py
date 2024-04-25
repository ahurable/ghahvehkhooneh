from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.serializers import ModelSerializer
from .serializers import CafeSerializer
from .models import Cafe
# Create your views here.


class CafeListView(APIView): 
    
    def get(self, request):
        
        serializer = CafeSerializer(Cafe.objects.all(), many=True)
        return Response(serializer.data, status=200)
    


class CafeView(APIView):

    def get(self, request, pk):
        serializer = CafeSerializer(Cafe.objects.get(id=pk))
        return Response(serializer.data, status=200)
    

class AddCafeView(APIView):

    permission_classes = [IsAuthenticated]

    class Serializer(ModelSerializer):
        model = Cafe()
        fields = ['name', 'location', 'address', 'about', 'picture' ]


    def post(self, request):
        serializer = CafeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"added": "Your Cafe add request has been sent with successfully"}, status=200)
        
        else:
            return Response({'error':'something went wrong with your request to add cafe'}, status=500)
        