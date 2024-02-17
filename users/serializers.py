from rest_framework import serializers
from django.contrib.auth import get_user_model
from colorama import Fore
from .models import CustomUser

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'


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
        
        return User.objects.create(
            username=validated_data['username'],
            phone_number=validated_data['phone_number'],
            password=validated_data['password']
        )