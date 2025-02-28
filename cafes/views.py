from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from django.db.models import Count
import datetime
from .serializers import *
from .models import *
# Create your views here.


class CafeListView(APIView): 
    permission_classes = (AllowAny, )
    def get(self, request):
        
        serializer = CafeListSerializer(Cafe.objects.all().order_by('-id'), many=True)
        return Response(serializer.data, status=200)
    


class CafeView(APIView):
    permission_classes = (AllowAny, )
    def get(self, request, slug):
        try:
            cafe = Cafe.objects.get(slug=slug)
        except Cafe.DoesNotExist:
            return Response({"error": "Cafe not found"}, status=404)

        serializer = CafeSerializer(cafe)
        
        categories = CategoryFood.objects.filter(cafe=cafe)  # Use .filter() instead of .get()
        category_serializer = CategorySerializer(categories, many=True)  # Ensure many=True

        return Response({'cafe': serializer.data, 'categories': category_serializer.data}, status=200)

class AddCafeView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        print(request.data)
        serializer = CreateCafeRequestSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            print(serializer)
            instance = serializer.save()
            Cafe.objects.get(id=instance.id).admin.add(request.user)
            return Response({'success':'cafe created with successfully'}, status=200)
        return Response({'error':'something went wrong with your request'}, status=500)


class AllCafeCardListView(ListAPIView):

    class Serializer(serializers.ModelSerializer):
        pictures = PictureSerializer(many=True)
        class Meta:
            model = Cafe
            fields = ['id', 'name', 'about', 'slug', 'pictures']

    serializer_class = Serializer
    queryset = Cafe.objects.all().filter(is_approved=True)




class GetAllClubsView(ListAPIView):
    serializer_class = AllFieldsClubSerializer

    def get_queryset(self):
        try:
            qs = Club.objects.annotate(members_count=Count('members')).filter(city__city=self.request.user.city).order_by('-members_count')
        except:
            qs = Club.objects.annotate(members_count=Count('members')).order_by('-members_count')
        return qs
    

class GetClubInformationView(RetrieveAPIView):
    serializer_class = DetialedMembersClubSerializer
    queryset = Club.objects.all()
    

class CreateEventView(APIView):

    permission_classes = [IsAuthenticated]
    def post(self, request):
        club = Club.objects.get(id=request.data['club'])
        # print(request.data)
        mutable_data = request.data.copy()
        mutable_data['cafe'] = club.cafe.id
        mutable_data['created_by'] = request.user.id
        serializer = CreateEventSerializer(data=mutable_data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response({'موفق':'رویداد با موفقیت ایجاد شد.'})
        else:
            return Response({'خطا', 'فرم اشتباه پر شده است'}, status=500)
        

class ListEventView(ListAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        if (self.request.user.is_authenticated):
            if (self.user.clubs.length > 0):
                try:
                    qs = Event.objects.all().filter(members__in=self.request.user).order_by('-id')
                except:
                    qs = Event.objects.all().order_by('-id')
            qs = Event.objects.all()
        qs = Event.objects.all()
        return qs


class EventDetailView(RetrieveAPIView):
    serializer_class = DetailedEventSerializer
    queryset = Event.objects.all()
            

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def participantInEventView(request, event_id):
    try:
        event_instance = Event.objects.get(id=event_id)
        print(event_instance)
        user = User.objects.get(id=request.user.id)
        event_instance.participents.add(user)
        return Response({'succeed':'you\'ve benn added to the participants of this event'}, status=201)   

    except Event.DoesNotExist:
        print('could\'nt find event')
        return Response({"404":"we could'nt find the event u submitted for"}, status=404)


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
    
    clubs = User.objects.get(id=request.user.id).his_clubs
    serializer = SmallDetailedClubSerializer(clubs, many=True)
    if len(serializer.data) == 0:
        return Response({'none':'no club'}, status=400)
    return Response(serializer.data)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def check_admin(request):
    try:
        user = User.objects.get(id=request.user.id)
        if Cafe.objects.filter(admin=user).exists():
            return Response({'true':'the user is a cafe owner'}, status=200)
        return Response({'false':'the user has no cafe'}, status=400)
    except:
        return Response({'error':'the token is expired'})


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def add_user_to_club(request, club_id):
    club = Club.objects.get(id=club_id)
    user = User.objects.get(id=request.user.id)
    try:
        club.members.add(user)
        return Response({}, status=201)
    except: 
        print("Some problems happened during the add")
        return Response({"error": "Some problems happened"}, status=400)
    
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def check_club_subscribed(request, club_id):
    # try:
        user = User.objects.get(id=request.user.id)
        if (user in Club.objects.get(id=club_id).members.all()): 
            return Response({}, status=201)
        return Response({}, status=200)
    # except:
    #     print("some problems happened")
    #     return Response({}, status=500)