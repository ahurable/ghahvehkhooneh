from django.db import models
from users.models import CustomUser as User
import os
import random
from users.models import City
from django.utils.text import slugify

# Create your models here.



def menu_image_upload(instance, file):
    basename = os.path.basename(file)
    name, ext = os.path.splitext(basename)
    new_path = f'cafes/{instance.category.id}/menu/{instance.item}{ext}'
    return new_path

def cafe_image_upload(instance, file):
    basename = os.path.basename(file)
    name, ext = os.path.splitext(basename)
    new_path = f'cafes/{instance.cafe.name}/cafe/{instance.cafe.name}-{random.randint(0,99)}{ext}'
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
    slug = models.SlugField(unique=True, blank=True, null=True, allow_unicode=True)
    is_approved = models.BooleanField(default=False)
    invisible = models.BooleanField(default=True)
    admin = models.ManyToManyField(User, related_name='cafes')
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='cafes', null=True, blank=True)
    number= models.CharField(max_length=12)

    def generate_unique_slug(self):
        base_slug = slugify(self.name, allow_unicode=True)  # Generate initial slug
        unique_slug = base_slug
        num = 1

        while Cafe.objects.filter(slug=unique_slug).exists():  # Check for duplicates
            unique_slug = f"{base_slug}-{num}"  # Append number if slug exists
            num += 1

        return unique_slug

    def save(self, *args, **kwargs):
        if not self.slug:  # Generate slug only if it's empty
            self.slug = self.generate_unique_slug()
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.name
    
class Picture(models.Model):
    picture = models.ImageField(upload_to=cafe_image_upload, blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    cafe = models.ForeignKey(Cafe, on_delete=models.CASCADE, related_name="pictures")


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
    cafe = models.ForeignKey(Cafe, on_delete=models.CASCADE, related_name='categories')
    def __str__(self) -> str:
        return self.name
    


class MenuItem(models.Model) :
    item = models.CharField(max_length=200)
    description = models.TextField(default="")
    picture = models.ImageField(upload_to=menu_image_upload, blank=True, null=True)
    category = models.ForeignKey(CategoryFood, related_name='items', on_delete=models.CASCADE, null=True, blank=True)
    price = models.IntegerField(max_length=999)

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
    date = models.CharField(max_length=50)
    time = models.CharField(max_length=25)
    cafe = models.ForeignKey(Cafe, on_delete=models.CASCADE, related_name='events')
    club = models.ForeignKey(Club, related_name="events", on_delete=models.CASCADE)
    intvited = models.ManyToManyField(User, related_name="suggestions")
    participents = models.ManyToManyField(User, related_name="participations")
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='events')


    def __str__(self) -> str:
        return self.name