from django.db import models
from users.models import CustomUser as User
import os
import random
# Create your models here.


def menu_image_upload(instance, file):
    basename = os.path.basename(file)
    name, ext = os.path.splitext(basename)
    new_path = f'cafes/{instance.cafe.id}/menu/{instance.item}{ext}'
    return new_path

def cafe_image_upload(instance, file):
    basename = os.path.basename(file)
    name, ext = os.path.splitext(basename)
    new_path = f'cafes/{instance.name}/cafe/{instance.name}-{random.randint(0,99)}{ext}'
    return new_path

def event_image_upload(instance, file):
    basename = os.path.basename(file)
    name, ext = os.path.splitext(basename)
    new_path = f'cafes/{instance.cafe.id}/event/{name}{ext}'
    return new_path

class Cafe(models.Model):
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=200)
    about = models.CharField(max_length=200)
    picture = models.ImageField(upload_to=cafe_image_upload, blank=True, null=True)
    is_approved = models.BooleanField(default=False)
    admin = models.ManyToManyField(User)

    def __str__(self) -> str:
        return self.name
    

class MenuItem(models.Model) :
    item = models.CharField(max_length=200)
    description = models.TextField()
    picture = models.ImageField(upload_to=menu_image_upload, blank=True, null=True)
    cafe = models.ForeignKey(Cafe, on_delete=models.CASCADE, related_name='menu_item')

    def __str__(self) -> str:
        return self.item
    

class Event(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    picture = models.ImageField(upload_to=event_image_upload, blank=True, null=True)
    date = models.DateTimeField()
    cafe = models.ForeignKey(Cafe, on_delete=models.CASCADE, related_name='events')

    def __str__(self) -> str:
        return self.name
    

# class City(models.Model):
