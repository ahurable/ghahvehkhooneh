from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from colorama import Fore
from rest_framework_simplejwt.tokens import Token
from .utls import checkAdmin
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'


class GetAnyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 'bio', 'avatar']


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class GetUserWithAnyProfileSerializer(serializers.ModelSerializer):
    profile = GetAnyProfileSerializer()
    class Meta:
        model = CustomUser
        fields = ['id', 'profile']


class GetAllUsersInAreaSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'profile']


class CreateUserSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField()
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model= CustomUser
        fields = ['phone_number', 'password', 'password2', 'username',]
    
    def validate(self, attrs):
        
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError("password and its repeating is not the same")
        return attrs
    

    
    def create(self, validated_data):


        if validated_data['phone_number'].startswith('0'):
            print(Fore.CYAN + 'it starts with 0 ' + Fore.WHITE)
            print(validated_data['phone_number'])
            phone = [x for x in validated_data['phone_number']]
            print(phone)
            phone.pop(0)
            phone = ''.join(phone)
            print(phone)
            validated_data['phone_number'] = phone

            print(Fore.GREEN + validated_data['phone_number'] + Fore.WHITE)


        if validated_data['phone_number'].startswith('+98') == False:
            print(Fore.CYAN + 'phone number dont have prefix' + Fore.WHITE)
            validated_data['phone_number'] = "+98"+validated_data['phone_number']
            print(Fore.GREEN + validated_data['phone_number'] + Fore.WHITE)
        
        return CustomUser.objects.create(
            username=validated_data['username'],
            phone_number=validated_data['phone_number'],
            password=validated_data['password']
        )
    


class CustomTokenObtainSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['avatar'] = user.profile.avatar.url
        token['is_admin'] = checkAdmin(user)
        token['is_verified'] = user.is_verified
        token['phone_number'] = str(user.phone_number)
        return token
    

class AvatarSerializer(serializers.ModelSerializer):
        class Meta:
            model = Profile
            fields = ['avatar', ]


class HobbySerializer(serializers.ModelSerializer):
    class Meta:
        model = Hobby
        fields = ['id','name']

class MusicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Music
        fields = ['id','name']

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id','name']

class PersonalitySerializer(serializers.ModelSerializer):
    fav_music = MusicSerializer(many=True)
    watched_movies= MovieSerializer(many=True)
    hobbies = HobbySerializer(many=True)
    class Meta:
        model = Personality
        fields = '__all__'


class CityListSerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['id', 'name']


class OTPRequestSerializer(serializers.Serializer):
    phone_number = serializers.CharField()

    def validate(self, attrs):
        phone_number = attrs.get("phone_number")
        try:
            user = CustomUser.objects.get(phone_number=phone_number)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("User not found.")

        user.generate_otp()  # Generate OTP when requested
        return attrs
    

class OTPVerifySerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    otp_code = serializers.CharField()

    def validate(self, attrs):
        phone_number = attrs.get("phone_number")
        otp_code = attrs.get("otp_code")

        try:
            user = CustomUser.objects.get(phone_number=phone_number)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("User not found.")

        if not user.is_otp_valid(otp_code):
            raise serializers.ValidationError("Invalid or expired OTP.")

        # OTP is correct, mark user as verified
        user.is_verified = True
        user.otp_code = None  # Clear OTP after verification
        user.save()

        return {"message": "Phone number verified successfully."}