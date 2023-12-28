from django.db import models
import os
# Create your models here.

def image_path(instance, file):
    basename = os.path.basename(file)
    exname, ext = os.path.splitext(basename)
    new_name = f"{instance.id}_slider{ext}"
    return f'sliderimg/{new_name}'

class Slider(models.Model):

    top_title = models.TextField(null=True, blank=True)
    title = models.TextField()
    helper = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    youtube = models.BooleanField()
    aparat = models.BooleanField()
    readmore = models.BooleanField()
    image = models.ImageField(upload_to=image_path, null=False, blank=False)

    def __str__(self):
        return str(self.title)