from django.contrib import admin
from .models import KeepingService, LendingService, Users

@admin.register(KeepingService)
class KeepingServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'base_price', 'additional_price', 'create_dt']

@admin.register(LendingService)
class LendingServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'base_price', 'additional_price', 'create_dt']

class UsersAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone_number', 'get_keeping_services', 'get_keeping_quantities', 'get_lending_services', 'get_lending_quantities', 'start_date', 'end_date', 'start_time', 'end_time', 'total_price', 'payment_method', 'terms_agreed', ]

    def get_keeping_services(self, obj):
        return ", ".join(map(str, obj.keeping_services))
    
    def get_keeping_quantities(self, obj):
        return ", ".join(map(str, obj.keeping_quantities))

    def get_lending_services(self, obj):
        return ", ".join(map(str, obj.lending_services))
    
    def get_lending_quantities(self, obj):
        return ", ".join(map(str, obj.lending_quantities))

    get_keeping_services.short_description = 'Keeping Services'
    get_keeping_quantities.short_description = 'Keeping Quantities'
    get_lending_services.short_description = 'Lending Services'
    get_lending_quantities.short_description = 'Lending Quantities'

admin.site.register(Users, UsersAdmin)
