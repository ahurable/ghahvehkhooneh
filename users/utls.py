from cafes.models import Cafe
import random


def checkAdmin(user):
    if Cafe.objects.filter(admin=user).exists:
        return True
    return False

def generate_otp():
    otp = random.randint(0,6)
    return otp