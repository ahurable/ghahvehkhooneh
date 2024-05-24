from rest_framework.permissions import BasePermission
from cafes.models import Cafe
from django.shortcuts import get_object_or_404

class IsAdminOfCafe(BasePermission):
    
    def has_permission(self, request, view):
        try:
            cid = view.kwargs['id']
        except:
            cid = view.kwargs['cafeid']
        cafe = get_object_or_404(Cafe, id=cid)
        if (request.user in cafe.admin.all()):
            return True
        return False
        # return True