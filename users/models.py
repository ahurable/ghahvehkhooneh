from django.db import models
from django.dispatch.dispatcher import receiver
from django.db.models.signals import post_save
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
import os, random
# Create your models here.


def upload_to(instance, file):
    basename = os.path.basename(file)
    name, ext = os.path.splitext(basename)
    newname = random.randint(100000, 999999)
    return f"avatars/{instance.user.username}/{instance.user.username}-{newname}{ext}"


class CustomUserManager(BaseUserManager):

    
    def create_user(self, username, phone_number, password=None, **extra_fields):
        user = self.model(
            username=username,
            phone_number=phone_number
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, username, phone_number, password=None, **extra_fields):
        user = self.create_user(username=username, phone_number=phone_number, password=password)
        user.is_admin = True
        user.save(using=self._db)
        return user
    
    def create(self, username, phone_number, password=None, **extra_fields):
        user = self.create_user(username=username, phone_number=phone_number, password=password)
        return user


class CustomUser(AbstractBaseUser):

    username = models.CharField(max_length=50 ,unique=True)
    phone_number = PhoneNumberField(region="IR", unique=True)

    is_admin = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['phone_number']
    objects = CustomUserManager()

    def __str__(self) -> str:
        return self.username

    def has_perm(self, perm, obj=None):
        "Does the user have permissions to view the app 'app_label'"

        return self.is_admin
    
    def has_module_perms(self, perm):
        return self.is_admin
    
    @property
    def is_staff(self):
        return self.is_admin

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'


class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=250, null=True, blank=True)
    last_name = models.CharField(max_length=250, null=True, blank=True)
    avatar = models.ImageField(upload_to=upload_to, default='users/default.png')
    bio = models.CharField(max_length=1000, blank=True)

    def __str__(self) -> str:
        return self.user.username
    
    @receiver(post_save, sender=CustomUser)
    def create_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=CustomUser)
    def save_profile(sender, instance, **kwargs):
        instance.profile.save()


