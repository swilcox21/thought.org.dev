from django.contrib.auth.models import User
from django.shortcuts import render
from .models import Thought, Folder
from .serializers import UserSerializer,ThoughtSerializer,FolderSerializer,GetAllFoldersSerializer
from rest_framework import viewsets, permissions
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
from django.shortcuts import get_object_or_404

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class FolderView(APIView):
    def get(self, request, folder_id=None):
        if folder_id is not None:
            folder = get_object_or_404(Folder.objects.all(), id = folder_id)
            serialized_folder = FolderSerializer(folder)
            return Response(serialized_folder.data)
        all_folders = Folder.objects.all()
        ser_all_folders = GetAllFoldersSerializer(all_folders, many=True)
        return Response(ser_all_folders.data)
    def post(self,request):
        ser_folder = FolderSerializer(data=request.data)
        if ser_folder.is_valid():
            ser_folder.save()
            return Response(ser_folder.data)
        return Response(ser_folder.errors)
    def put(self,request,folder_id):
        folder = get_object_or_404(Folder.objects.all(), id=folder_id)
        ser_folder = FolderSerializer(instance=folder, data=request.data, partial=True)
        if ser_folder.is_valid(raise_exception=True):
            ser_folder.save()
        return Response(ser_folder.data, status=204)
    def delete(self,request,folder_id):
        folder = get_object_or_404(Folder.objects.all(), id=folder_id)
        folder.delete()
        return Response({"message": "data: `{}` has been deleted".format(folder_id)},status=204)

class ThoughtView(APIView):
    def get(self, request, thought_id=None):
        if thought_id is not None:
            thought = get_object_or_404(Thought.objects.all(), id = thought_id)
            serialized_thought = ThoughtSerializer(thought)
            return Response(serialized_thought.data)
        all_thoughts = Thought.objects.all().order_by('-id')
        ser_all_thoughts = ThoughtSerializer(all_thoughts, many=True)
        return Response(ser_all_thoughts.data)
    def post(self,request):
        serialized_thought = ThoughtSerializer(data=request.data)
        if serialized_thought.is_valid():
            serialized_thought.save()
            return Response(serialized_thought.data)
        return Response(serialized_thought.errors)
    def put(self,request,thought_id):
        thought = get_object_or_404(Thought.objects.all(), id=thought_id)
        ser_thought = ThoughtSerializer(instance=thought, data=request.data, partial=True)
        if ser_thought.is_valid(raise_exception=True):
            ser_thought.save()
        return Response(ser_thought.data, status=204)
    def delete(self,request,thought_id):
        thought = get_object_or_404(Thought.objects.all(), id=thought_id)
        thought.delete()
        return Response({"message": "data: `{}` has been deleted".format(thought_id)},status=204)