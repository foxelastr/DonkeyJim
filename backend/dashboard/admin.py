from django.contrib import admin
from .models import KeepingService, LendingService

@admin.register(KeepingService)
class KeepingServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'base_price', 'additional_price', 'create_dt']

@admin.register(LendingService)
class LendingServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'base_price', 'additional_price', 'create_dt']
