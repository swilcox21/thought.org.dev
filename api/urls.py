from django.urls import include, path
from .views import ThoughtView, FolderView
from rest_framework import routers

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('thought', ThoughtView.as_view()),
    path('thought/<int:thought_id>', ThoughtView.as_view()),
    path('folder', FolderView.as_view()),
    path('folder/<int:folder_id>', FolderView.as_view()),
]