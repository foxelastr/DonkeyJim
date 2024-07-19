from django.contrib import admin
from .models import KeepingService, LendingService, Users

@admin.register(KeepingService)
class KeepingServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'base_price', 'additional_price', 'create_dt']

@admin.register(LendingService)
class LendingServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'base_price', 'additional_price', 'create_dt']

@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone_number', 'keeping_service', 'lending_service', 'start_date', 'end_date', 'total_price', 'terms_agreed')
    search_fields = ('name', 'phone_number', 'keeping_service', 'lending_service')
    list_filter = ('start_date', 'end_date', 'terms_agreed')