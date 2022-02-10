from genericpath import exists
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Thought, Folder

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email','username']

class AnotherFolderSerializer(serializers.ModelSerializer): 
    class Meta:                                 
        model = Folder
        fields = '__all__'  

class ThoughtSerializer(serializers.ModelSerializer):
    folder = AnotherFolderSerializer(required=False)
    class Meta:
        model = Thought
        fields = ['id','dashboard','thought','folder']

class FolderSerializer(serializers.ModelSerializer):
    thought = ThoughtSerializer(many=True, required=False)
    class Meta:
        model = Folder
        fields = ['id','name','dashboard','toggle','thought']
    def create(self, validated_data):
        return_data = validated_data.copy()
        thought_data = validated_data.pop('thought')
        exists = Folder.objects.filter(name = validated_data['name']).first()
        if exists is not None:
            for thought in thought_data:
                Thought.objects.create(folder=exists, **thought)
            return return_data
        folder = super(FolderSerializer, self).create(validated_data)
        for thought in thought_data:
            Thought.objects.create(folder=folder, **thought)
        return folder

class GetAllFoldersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = '__all__'

class GetAllThoughtsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thought
        fields = '__all__'