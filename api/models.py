from django.db import models
from sqlalchemy import ForeignKey
from django.conf import settings

class Folder(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Thought(models.Model):
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE)
    thought = models.CharField(max_length=5000)