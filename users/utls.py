from cafes.models import Cafe

def checkAdmin(user):
    if Cafe.objects.filter(admin=user).exists:
        return True
    return False