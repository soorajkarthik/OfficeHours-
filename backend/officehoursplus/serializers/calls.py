from officehoursplus.models import Call, UserCallAssociations
from officehoursplus.serializers.users import UserSerializer
from rest_framework import serializers


class CallSerializer(serializers.ModelSerializer):

    class Meta:
        model = Call
        fields = ['uuid', 'class_id', 'time_started', 'time_ended']


class UserCallAssociationSerializer(serializers.ModelSerializer):

    call_id = CallSerializer()
    user_id = UserSerializer()

    class Meta:
        model = UserCallAssociations
        fields = ['call_id', 'user_id', 'time_joined', 'time_left']
