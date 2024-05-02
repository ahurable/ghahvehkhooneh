from django.contrib import admin
from .models import CustomUser, Profile, City, Food, Hobby, Personality 
# Register your models here.


@admin.register(CustomUser)
class UserAdmin(admin.ModelAdmin):
    list_filter = ('is_admin', 'is_verified')
    list_display = ('username', 'phone_number')

admin.site.register(Profile)

admin.site.register(City)

admin.site.register(Food)

admin.site.register(Hobby)

admin.site.register(Personality)