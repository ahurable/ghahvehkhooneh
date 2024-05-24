from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
import datetime
from .serializers import *
from .models import *
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
        


class AllCafeCardListView(ListAPIView):

    class Serializer(serializers.ModelSerializer):
        class Meta:
            model = Cafe
            fields = ['id', 'name', 'about', 'picture']

    serializer_class = Serializer
    queryset = Cafe.objects.all().filter(is_approved=True)




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
    

class CreateEventView(APIView):

    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = CreateEventSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response({'success':'Event created with successfully'})


class ListEventView(ListAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        if (self.request.user.is_authenticated):
            if (self.user.clubs.length > 0):
                try:
                    qs = Event.objects.all().filter(members__in=self.request.user)
                except:
                    qs = Event.objects.all()
            qs = Event.objects.all()
        qs = Event.objects.all()
        return qs


class EventDetailView(RetrieveAPIView):
    serializer_class = DetailedEventSerializer
    queryset = Event.objects.all()
            

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def participantInEventView(request, event_id):
    event_instance = get_object_or_404(Event, id=event_id)
    event_instance.participents.add(request.user)
    return Response({'succeed':'you\'ve benn added to the participants of this event'}, status=201)   


@api_view(['POST'])
def offerCafeView(request):

    class CafeNameSeriailzer(serializers.Serializer):
        name = serializers.CharField()

    class CafeIdNameSerializer(serializers.ModelSerializer):
        class Meta:
            model = Cafe
            fields = ['id', 'name']

    serializer = CafeNameSeriailzer(data=request.data)

    if serializer.is_valid():
        print(serializer.data)
        cafes = Cafe.objects.all().filter(name__contains=serializer.data['name'])
        res_serializer = CafeIdNameSerializer(cafes, many=True)
        return Response(res_serializer.data)
    

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def clubOfferHook(request):
    
    clubs = Club.objects.all().filter(owner__id=request.user.id)
    serializer = SmallDetailedClubSerializer(clubs, many=True)
    return Response(serializer.data)

