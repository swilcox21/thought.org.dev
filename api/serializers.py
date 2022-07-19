from genericpath import exists
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Thought, Folder
from rest_framework.authtoken.models import Token

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
        fields = ['id','name','dashboard','toggle','thought', 'owner']
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

class UserSerializer(serializers.ModelSerializer):
    folders = FolderSerializer(many=True, required=False)
    class Meta:
        model = User
        fields = ['id','email','username','password','folders']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

class GetAllFoldersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = '__all__'


class GetAllThoughtsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thought
        fields = '__all__'