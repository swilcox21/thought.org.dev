from django.urls import include, path
from django.contrib import admin
from . import views
# from rest_framework import routers

# router = routers.DefaultRouter()

urlpatterns = [
    path('', admin.site.urls),
    path('login/', views.login),
]