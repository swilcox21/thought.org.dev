from django.contrib import admin
from .models import Folder, Thought

class ThoughtInline(admin.TabularInline):
    model = Thought
    extra = 0

class FolderAdmin(admin.ModelAdmin):
    model = Folder
    list_display = ['name','id','user']
    ordering = ['name']
    inlines = [ThoughtInline]
admin.site.register(Folder, FolderAdmin)
