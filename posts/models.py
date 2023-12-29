from django.db import models
from django.contrib.auth.models import User
import os
# Create your models here.

def slider_image_path(instance, file):
    basename = os.path.basename(file)
    exname, ext = os.path.splitext(basename)
    new_name = f"{instance.id}_slider{ext}"
    return f'sliderimg/{new_name}'

def post_image_path(instance, file):
    basename = os.path.basename(file)
    exname, ext = os.path.splitext(basename)
    new_name = f"{instance.id}_post{ext}"
    return f'posts/{new_name}'

class Slider(models.Model):

    top_title = models.TextField(null=True, blank=True)
    title = models.TextField()
    helper = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    youtube = models.BooleanField()
    aparat = models.BooleanField()
    readmore = models.BooleanField()
    image = models.ImageField(upload_to=slider_image_path, null=False, blank=False)

    def __str__(self):
        return str(self.title)
    

class Post(models.Model):
    
    title = models.CharField(max_length=100)
    subtitle = models.TextField()
    description = models.TextField()
    image = models.ImageField(upload_to=post_image_path, null=False, blank=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.title