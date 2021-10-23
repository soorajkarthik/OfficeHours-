from uuid import uuid4

from django.contrib.auth.models import User
from django.db import models
from django.db.models.deletion import CASCADE


class Classes(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)


class UserMentorRequests(models.Model):
    user_id = models.ForeignKey(User, on_delete=CASCADE)
    class_id = models.ForeignKey(Classes, on_delete=CASCADE)
    request_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user_id', 'class_id']


class UserMentorAssociations(models.Model):
    user_id = models.ForeignKey(User, on_delete=CASCADE)
    class_id = models.ForeignKey(Classes, on_delete=CASCADE)
    creation_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user_id', 'class_id']


USER_CLASS_STATUS = [
    ("online", "online"),
    ("in_call", "in_call"),
    ("session_ended", "session_ended")
]

class ClassUserStatus(models.Model):
    user_id = models.ForeignKey(User, on_delete=CASCADE)
    class_id = models.ForeignKey(Classes, on_delete=CASCADE)
    time_joined = models.DateTimeField(auto_now_add=True)
    time_left = models.DateTimeField(null=True)
    status = models.CharField(max_length=30, choices=USER_CLASS_STATUS, default="online")


class Call(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    class_id = models.ForeignKey(Classes, on_delete=CASCADE)
    time_started = models.DateTimeField(auto_now_add=True)
    time_ended = models.DateTimeField(null=True)


class UserCallAssociations(models.Model):
    call_id = models.ForeignKey(Call, on_delete=CASCADE)
    user_id = models.ForeignKey(User, on_delete=CASCADE)
    time_joined = models.DateTimeField(auto_now_add=True)
    time_left = models.DateTimeField(null=True)
