from django.contrib.auth.models import User
from rest_framework import mixins, viewsets, serializers

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
        return User.objects.create_userd(
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            username = validated_data['email'],
            email = validated_data['email'],
            password = validated_data['password']
        )

class UserViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin):
    
    queryset = User.objects.all()
    serializer_class = UserSerializer

    serializer_override_map = {
        'create': UserCreateSerializer
    }

    permission_classes = []

    def get_serializer_class(self):
        if self.action in self.serializer_override_map:
            return self.serializer_override_map[self.action]

        return super().get_serializer_class()