from django.contrib import admin
from .models import *
# Register your models here.


@admin.register(CustomUser)
class UserAdmin(admin.ModelAdmin):
    list_filter = ('is_admin', 'is_verified')
    list_display = ('username', 'phone_number')

admin.site.register(Profile)

admin.site.register(City)
