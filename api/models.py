from django.db import models
from django.conf import settings

class Folder(models.Model):
    name = models.CharField(max_length=50)
    dashboard = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Thought(models.Model):
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, related_name='thought')
    thought = models.CharField(max_length=5000, default='')
    dashboard = models.BooleanField(default=False)

    def __str__(self):
        return self.thought
        