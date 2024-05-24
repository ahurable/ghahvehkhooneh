from django.db import models
from users.models import CustomUser as User
import os
import random
from users.models import City
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

def event_image_upload(instance, file):
    basename = os.path.basename(file)
    name, ext = os.path.splitext(basename)
    new_path = f'clubs/{instance.cafe.id}/event/{name}{ext}'
    return new_path



def category_image_upload(instance, file):
    basename = os.path.basename(file)
    name, ext = os.path.splitext(basename)
    new_path = f'menu/{instance.name}/{name}{ext}'
    return new_path



class Cafe(models.Model):
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=200)
    about = models.CharField(max_length=200)
    picture = models.ImageField(upload_to=cafe_image_upload, blank=True, null=True)
    is_approved = models.BooleanField(default=False)
    admin = models.ManyToManyField(User, related_name='cafes')
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='cafes', null=True, blank=True)

    def __str__(self) -> str:
        return self.name
    

class Rating(models.Model):
    cafe = models.ForeignKey(Cafe, on_delete=models.CASCADE, related_name='ratings')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField(null=True, blank=True)
    rating = models.PositiveIntegerField(choices=((1, '1 star'), (2, '2 stars'), (3, '3 stars'), (4, '4 stars'), (5, '5 stars')))
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('cafe', 'user')

    def __str__(self) -> str:
        return f"{self.user} rating {self.rating} stars for {self.cafe}"
    


class CategoryFood(models.Model):
    name = models.CharField(max_length=200)
    picture = models.ImageField(upload_to=category_image_upload, default=None, blank=True)
    def __str__(self) -> str:
        return self.name
    


class MenuItem(models.Model) :
    item = models.CharField(max_length=200)
    description = models.TextField()
    picture = models.ImageField(upload_to=menu_image_upload, blank=True, null=True)
    category = models.ManyToManyField(CategoryFood, related_name='items')
    price = models.IntegerField(max_length=999)
    cafe = models.ForeignKey(Cafe, on_delete=models.CASCADE, related_name='menu_item')

    def __str__(self) -> str:
        return self.item
    


    

class Club(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField()
    club_avatar = models.ImageField()
    cafe = models.OneToOneField(Cafe, on_delete=models.CASCADE, related_name='club')
    admin = models.ManyToManyField(User, related_name="his_clubs")
    members = models.ManyToManyField(User, related_name='clubs')

    def __str__(self) -> str:
        return f'{self.cafe.name} {self.name}'
    

class Event(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    cafe = models.ForeignKey(Cafe, on_delete=models.CASCADE, related_name='events')
    club = models.ForeignKey(Club, related_name="events", on_delete=models.CASCADE)
    intvited = models.ManyToManyField(User, related_name="suggestions")
    participents = models.ManyToManyField(User, related_name="participations")
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='events')


    def __str__(self) -> str:
        return self.name