from django.urls import include, path
from . import views
# from rest_framework import routers

# router = routers.DefaultRouter()

urlpatterns = [
    path('', views.home),
    path('login/', views.login),
]