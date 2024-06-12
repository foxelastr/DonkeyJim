from django.contrib import admin
from .models import Item, KeepingService

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'description']

@admin.register(KeepingService)
class KeepingServiceAdmin(admin.ModelAdmin):
    list_display = ['__name__', '__date__', 'base_price', 'additional_price']

# @admin.register(Reservation)
# class ReservationAdmin(admin.ModelAdmin):
#     list_display = ['user', 'service', 'reservation_date']
