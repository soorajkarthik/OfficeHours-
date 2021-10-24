from django.contrib.auth.models import User
from officehoursplus.models import UserMentorAssociations
from officehoursplus.serializers.classes import ClassSerializer
from officehoursplus.serializers.users import (UserCreateSerializer,
                                               UserSerializer)
from rest_framework import mixins, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response


class UserViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin):
    
    queryset = User.objects.all()
    serializer_class = UserSerializer
    serializer_override_map = {
        'create': UserCreateSerializer
    }

    permission_classes = [IsAuthenticated]

    
    def get_serializer_class(self):
        if self.action in self.serializer_override_map:
            return self.serializer_override_map[self.action]

        return super().get_serializer_class()


    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        elif self.action == 'list':
            return [IsAdminUser()]
        else:
            return super().get_permissions()


    @action(detail=True, methods=['get'], url_path='mentorship_list')
    def get_mentorship_list(self, request, pk):
        associations = UserMentorAssociations.objects.filter(user_id=pk)
        serializer = ClassSerializer(instance=[association.class_id for association in list(associations)], many=True)
        return Response(data=serializer.data, status=200)

