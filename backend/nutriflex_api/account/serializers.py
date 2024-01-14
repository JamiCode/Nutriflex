from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Account

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'email','first_name', 'last_name']  

class UserRegisterSerializer(serializers.ModelSerializer):
    """ UserRegister Serializer for registering users into the database"""

    password = serializers.CharField(max_length=60, min_length=6, write_only=True)
    password2 = serializers.CharField(max_length=68, min_length=6, write_only=True)

    class Meta:
        model = Account
        fields = ['email', 'first_name', 'last_name', 'password', 'password2',]

    def validate(self, attrs):
        """ Performs password validation"""
        password1 = attrs.get('password')
        password2 = attrs.pop('password2', None)

        if password1 != password2:
            raise serializers.ValidationError("Passwords do not match.")
      
        elif (
            not any(char.isupper() for char in password1) or
            not any(char.islower() for char in password1) or
            not any(char.isdigit() for char in password1) or
            len(password1) < 8
        ):
            raise serializers.ValidationError('Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long.')


        return attrs

    def create(self, validated_data):
        """ Creates the user in the database """
        password = validated_data.pop('password')
        validated_data.pop('password2', None)  # Remove password2 field from validated data

        # Create and return the user instance
        return Account.objects.create_user(password=password, **validated_data)
    

class LogoutSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()
    access_token = serializers.CharField()
    