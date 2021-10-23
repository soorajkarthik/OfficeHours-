from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE

class Classes(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)

class UserMentorAssociations(models.Model):
    user_id = models.ForeignKey(User, on_delete=CASCADE)
    class_id = models.ForeignKey(Classes, on_delete=CASCADE)

    class Meta:
        unique_together = ["user_id", "class_id"]

class ClassOnlineUsers(models.Model):
    user_id = models.ForeignKey(User, primary_key=True, on_delete=CASCADE)
    class_id = models.ForeignKey(Classes, on_delete=CASCADE)

    class Meta:
        unique_together = ["user_id", "class_id"]