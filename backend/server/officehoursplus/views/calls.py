from datetime import datetime

from officehoursplus.models import Call, UserCallAssociations
from rest_framework import mixins, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from officehoursplus.serializers.calls import (
    CallSerializer, UserCallAssociationSerializer)


class CallViewSet(viewsets.ModelViewSet, mixins.CreateModelMixin, mixins.ListModelMixin):

    queryset = Call.objects.get_queryset()
    serializer_class = CallSerializer
    serializer_override_map = {}

    permission_classes = []

    def get_serializer_class(self):
        if self.action in self.serializer_override_map:
            return self.serializer_override_map[self.action]

        return super().get_serializer_class()


    @action(detail=True, methods=['post'], url_path='end_call')
    def end_call(self, request, pk):
        call = Call.objects.get(pk=pk)

        if not call.time_ended:
            Call.objects.filter(pk=pk).update(time_ended=datetime.utcnow())
            UserCallAssociations.objects.filter(call_id=pk, time_left=None).update(time_left=datetime.utcnow())
        
        serializer = CallSerializer(Call.objects.get(pk=pk))
        return Response(data=serializer.data, status=200)


    @action(detail=True, methods=['post'], url_path='join_call')
    def join_call(self, request, pk):
        user = request.user

        if UserCallAssociations.objects.filter(call_id=pk, user_id=user.id, time_left=None).count():
            return Response(data="You are already in this call!", status=400)
        else:
            association = UserCallAssociations.objects.create(
                call_id=Call.objects.get(pk=pk),
                user_id=user
            )

            serializer = UserCallAssociationSerializer(association)
            return Response(data=serializer.data, status=201)


    @action(detail=True, methods=['post'], url_path='leave_call')
    def leave_call(self, request, pk):
        user = request.user

        UserCallAssociations.objects.filter(user_id=user.id, call_id=pk).update(time_left=datetime.utcnow())
        serializer = UserCallAssociationSerializer(UserCallAssociations.objects.get(user_id=user.id, call_id=pk))
        return Response(data=serializer.data, status=200)
