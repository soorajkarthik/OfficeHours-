from django.contrib.auth.models import User
from django.db import models
from django.db.models import fields
from rest_framework.permissions import IsAdminUser
from rest_framework import mixins, viewsets, serializers
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response
from officehoursplus.models import Classes, UserMentorAssociations


class ClassSerializer(serializers.ModelSerializer):

    id = fields.Field(editable=False)

    class Meta:
        model = Classes
        fields = ["id", "name"]

class ClassViewSet(viewsets.ModelViewSet, mixins.CreateModelMixin, mixins.ListModelMixin):

    queryset = Classes.objects.get_queryset()
    serializer_class = ClassSerializer

    permission_classes = []

    serializer_override_map = {}

    def get_serializer_class(self):
        if self.action in self.serializer_override_map:
            return self.serializer_override_map[self.action]

        return super().get_serializer_class()

    @action(detail=True, methods=["post", "get"], url_path="add_mentor/(?P<user_id>[^/d]+)")
    def add_mentor(self, request, pk, user_id):
        association = UserMentorAssociations.objects.create(
            class_id = Classes.objects.get(id = pk), 
            user_id = User.objects.get(id = user_id)
        )
        return Response(data="association added", status=201) # add serializer here you fool


    

    