from django.contrib import admin
from .models import Managers

class ManagersAdmin(admin.ModelAdmin):
    list_display = ['user', 'phone_number']

    def get_user_email(self, obj):
        return obj.user.email
    get_user_email.short_description = 'Email'

admin.site.register(Managers, ManagersAdmin)
