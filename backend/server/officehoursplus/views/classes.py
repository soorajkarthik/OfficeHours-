from django.contrib.auth.models import User
from django.db import models
from django.db.models import fields
from officehoursplus.models import (Classes, ClassUserStatus,
                                    UserMentorAssociations, UserMentorRequests)
from officehoursplus.views.users import UserSerializer
from rest_framework import mixins, serializers, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import (IsAdminUser, IsAuthenticated,
                                        IsAuthenticatedOrReadOnly)
from rest_framework.response import Response

from datetime import datetime


class ClassSerializer(serializers.ModelSerializer):

    id = fields.Field(editable=False)

    class Meta:
        model = Classes
        fields = ['id', 'name']


class MentorRequestSerializer(serializers.ModelSerializer):

    user_id = UserSerializer()
    class_id = ClassSerializer()

    class Meta:
        model = UserMentorRequests
        fields = ['id', 'user_id', 'class_id', 'request_time']


class UserMentorAssociationSerializer(serializers.ModelSerializer):

    user_id = UserSerializer()
    class_id = ClassSerializer()

    class Meta:
        model = UserMentorAssociations
        fields = ['id', 'user_id', 'class_id', 'creation_time']


class ClassUserStatusSerializer(serializers.ModelSerializer):

    user_id = UserSerializer()
    class_id = ClassSerializer()

    class Meta:
        model = ClassUserStatus
        fields = ['user_id', 'class_id', 'time_joined', 'time_left', 'status']


class ClassViewSet(viewsets.ModelViewSet, mixins.CreateModelMixin, mixins.ListModelMixin):

    queryset = Classes.objects.get_queryset()
    serializer_class = ClassSerializer
    serializer_override_map = {}

    permission_classes = [IsAuthenticatedOrReadOnly]

    
    def get_serializer_class(self):
        if self.action in self.serializer_override_map:
            return self.serializer_override_map[self.action]

        return super().get_serializer_class()


    def get_permissions(self):
        if self.action == 'create':
            return [IsAdminUser()]
        else:
            return super().get_permissions()


    @action(detail=True, methods=['post'], url_path='request_mentor_status')
    def request_mentor_status(self, request, pk):

        mentor_request = UserMentorRequests.objects.create(
            user_id = User.objects.get(pk=request.user.id),
            class_id = Classes.objects.get(pk=pk)
        )

        serializer = MentorRequestSerializer(instance=mentor_request)
        return Response(data=serializer.data, status=201)


    @action(detail=True, methods=['post'], url_path='join_class')
    def join_class(self, request, pk):
        user = request.user
        
        if ClassUserStatus.objects.filter(user_id=user.id, time_left=None).count():
            return Response(data="User is already online in a class", status=400)
        else:
            history = ClassUserStatus.objects.create(
                user_id=user, 
                class_id=Classes.objects.get(pk=pk)
            )
            serializer = ClassUserStatusSerializer(instance=history)
            return Response(data=serializer.data, status=200)


    @action(detail=True, methods=['post'], url_path='leave_class')
    def leave_class(self, request, pk):
        user = request.user

        ClassUserStatus.objects.filter(user_id=user.id, class_id=pk, time_left=None).update(time_left=datetime.utcnow(), status='session_ended')      
        return Response(data="User left class successfully", status=200)


    @action(detail=True, methods=['get'], url_path='users')
    def get_user_list(self, request, pk):
        queryset = ClassUserStatus.objects.filter(class_id=pk, time_left=None)
        serializer = ClassUserStatusSerializer(list(queryset), many=True)
        return Response(data=serializer.data, status=200)
        

class MentorRequestViewSet(viewsets.ModelViewSet):

    queryset = UserMentorRequests.objects.get_queryset()
    serializer_class = MentorRequestSerializer
    serializer_override_map = {}

    permission_classes = [IsAdminUser]

    def get_serializer_class(self):
        if self.action in self.serializer_override_map:
            return self.serializer_override_map[self.action]

        return super().get_serializer_class()


    @action(detail=True, methods=['post'], url_path='accept')
    def accept_mentor_request(self, request, pk):
        mentor_request = UserMentorRequests.objects.get(pk=pk)
        UserMentorRequests.objects.filter(pk=pk).delete()
        
        if UserMentorAssociations.objects.filter(user_id=mentor_request.user_id, class_id=mentor_request.class_id).count():
            return Response(data="That user is already a mentor for that course!", status=400)
        else:
            association = UserMentorAssociations.objects.create(user_id=mentor_request.user_id, class_id=mentor_request.class_id)
            serializer = UserMentorAssociationSerializer(instance=association)
            return Response(data=serializer.data, status=201)
