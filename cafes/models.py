from django.db import models
from users.models import CustomUser as User
import os
# Create your models here.


def menu_image_upload(instance, file):
    basename = os.path.basename(file)
    name, ext = os.path.splitext(basename)
    new_path = f'/cafes/{instance.cafe.name}/menu/{instance.item}{ext}'
    return new_path

def cafe_image_upload(instance, file):
    basename = os.path.basename(file)
    name, ext = os.path.splitext(basename)
    new_path = f'/cafes/{instance.name}/cafe/{instance.name}{ext}'
    return new_path

def event_image_upload(instance, file):
    basename = os.path.basename(file)
    name, ext = os.path.splitext(basename)
    new_path = f'/cafes/{instance.cafe.name}/event/{instance.name}{ext}'
    return new_path

class Cafe(models.Model):
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    about = models.CharField(max_length=200)
    picture = models.ImageField(upload_to=cafe_image_upload, blank=True, null=True)
    admin = models.ManyToManyField(User)

    def __str__(self) -> str:
        return self.name
    

class MenuItem(models.Model) :
    item = models.CharField(max_length=200)
    description = models.TextField()
    picture = models.ImageField(upload_to=menu_image_upload, blank=True, null=True)
    cafe = models.ForeignKey(Cafe, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.item
    

class Event(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    picture = models.ImageField(upload_to=event_image_upload, blank=True, null=True)
    date = models.DateTimeField()
    cafe = models.ForeignKey(Cafe, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.name