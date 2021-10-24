from django.db.models import fields
from officehoursplus.models import Classes, ClassUserStatus, UserMentorRequests
from officehoursplus.serializers.users import UserSerializer
from officehoursplus.models import UserMentorAssociations
from rest_framework import serializers


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


class ClassUserStatusSerializer(serializers.ModelSerializer):

    user_id = UserSerializer()
    class_id = ClassSerializer()

    class Meta:
        model = ClassUserStatus
        fields = ['user_id', 'class_id', 'time_joined', 'time_left', 'status']


class UserMentorAssociationSerializer(serializers.ModelSerializer):

    user_id = UserSerializer()
    class_id = ClassSerializer()

    class Meta:
        model = UserMentorAssociations
        fields = ['id', 'user_id', 'class_id', 'creation_time']
