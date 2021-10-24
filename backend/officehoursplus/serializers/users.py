from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']

class UserCreateSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']

    
    def create(self, validated_data):
        return User.objects.create_user(
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            username = validated_data['email'],
            email = validated_data['email'],
            password = validated_data['password']
        )
