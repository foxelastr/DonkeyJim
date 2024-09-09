from django.contrib import admin
from django.utils.safestring import mark_safe
from django.utils.html import format_html
from .models import KeepingService, LendingService, Users

@admin.register(KeepingService)
class KeepingServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'base_price', 'additional_price', 'main_image', 'detail_image', 'create_dt']

@admin.register(LendingService)
class LendingServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'base_price', 'additional_price', 'main_image', 'detail_image', 'create_dt']

class UsersAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'phone_number', 'get_keeping_services', 'get_keeping_quantities',
        'get_lending_services', 'get_lending_quantities', 'start_date', 'end_date',
        'start_time', 'end_time', 'formatted_total_price', 'payment_method', 'terms_agreed', 'change_status_display', 'initial_verification_display', 'final_verification_display',
    ]

    def get_keeping_services(self, obj):
        return ", ".join(map(str, obj.keeping_services))

    def get_keeping_quantities(self, obj):
        return ", ".join(map(str, obj.keeping_quantities))

    def get_lending_services(self, obj):
        return ", ".join(map(str, obj.lending_services))

    def get_lending_quantities(self, obj):
        return ", ".join(map(str, obj.lending_quantities))

    def formatted_total_price(self, obj):
        if obj.total_price is not None:
            formatted_price = '{:,.0f}'.format(obj.total_price)
            return mark_safe(formatted_price)
        return "-"
    
    def change_status_display(self, obj):
        if obj.change_status:
            return format_html('<span style="color: #80DEEA;">Changed</span>')
        return ""
    
    def initial_verification_display(self, obj):
        if obj.initial_verification:
            return format_html('<span style="color: #FFF176;">Check</span>')
        return ""

    def final_verification_display(self, obj):
        if obj.final_verification:
            return format_html('<span style="color: #F50057;">Check</span>')
        return ""

    get_keeping_services.short_description = 'Keeping Services'
    get_keeping_quantities.short_description = 'Keeping Quantities'
    get_lending_services.short_description = 'Lending Services'
    get_lending_quantities.short_description = 'Lending Quantities'
    formatted_total_price.short_description = 'Total Price'
    change_status_display.short_description = 'Change Status'
    initial_verification_display.short_description = 'Initial Verification'
    final_verification_display.short_description = 'Final Verification'

admin.site.register(Users, UsersAdmin)
