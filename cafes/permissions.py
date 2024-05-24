from rest_framework.permissions import BasePermission
from .models import Club
from django.shortcuts import get_object_or_404

class IsAdminOfCafe(BasePermission):
    
    def has_permission(self, request, view):
        
        club = get_object_or_404(Club, request.data.club)
        
        if (request.user in club.admin.all()):
            return True
        return False
        # return True