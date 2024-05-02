from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from .serializers import CafeSerializer, CafeListSerializer, AllFieldsClubSerializer, DetialedMembersClubSerializer
from .models import Cafe, Club
# Create your views here.


class CafeListView(APIView): 
    permission_classes = (AllowAny, )
    def get(self, request):
        
        serializer = CafeListSerializer(Cafe.objects.all(), many=True)
        return Response(serializer.data, status=200)
    


class CafeView(APIView):
    permission_classes = (AllowAny, )
    def get(self, request, id):
        serializer = CafeSerializer(Cafe.objects.get(id=id))
        return Response(serializer.data, status=200)
    

class AddCafeView(CreateAPIView):
    queryset = Cafe.objects.all()
    serializer_class = CafeSerializer
    permission_classes = (IsAuthenticated,)
        

class GetAllClubsView(ListAPIView):

    serializer_class = AllFieldsClubSerializer

    def get_queryset(self):
        try:
            qs = Club.objects.all().filter(city__city=self.request.user.city)
        except:
            qs = Club.objects.all()
        return qs
    
class GetClubInformationView(RetrieveAPIView):
    serializer_class = DetialedMembersClubSerializer
    queryset = Club.objects.all()
    