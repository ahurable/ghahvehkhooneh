from django.db import models
from django.dispatch.dispatcher import receiver
from django.db.models.signals import post_save
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils.timezone import now
from datetime import timedelta
import os, random

class City(models.Model):
    name = models.CharField(max_length=120)

    def __str__(self) -> str:
        return self.name

def upload_to(instance, file):
    basename = os.path.basename(file)
    name, ext = os.path.splitext(basename)
    newname = random.randint(100000, 999999)
    return f"users/avatars/{instance.user.phone_number}/{newname}{ext}"

class CustomUserManager(BaseUserManager):
    def create_user(self, phone_number, **extra_fields):
        if not phone_number:
            raise ValueError('شماره موبایل الزامی است')
        
        user = self.model(
            phone_number=phone_number,
            **extra_fields
        )
        user.save(using=self._db)
        return user
    
    def create_superuser(self, phone_number, password=None, **extra_fields):
        user = self.create_user(phone_number=phone_number, **extra_fields)
        user.is_admin = True
        if password:
            user.set_password(password)
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser):
    phone_number = PhoneNumberField(region="IR", unique=True)
    is_admin = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    otp_code = models.CharField(max_length=6, blank=True, null=True)
    otp_created_at = models.DateTimeField(blank=True, null=True)
    otp_expires_at = models.DateTimeField(blank=True, null=True)

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = []
    objects = CustomUserManager()

    def generate_otp(self):
        """تولید کد 6 رقمی و ذخیره آن با زمان انقضا"""
        self.otp_code = str(random.randint(100000, 999999))
        self.otp_created_at = now()
        self.otp_expires_at = now() + timedelta(minutes=2)  # کد پس از 5 دقیقه منقضی می‌شود
        self.save()
        return self.otp_code

    def is_otp_valid(self, otp):
        """بررسی معتبر بودن کد OTP"""
        if not self.otp_code or not self.otp_expires_at:
            return False
        return (self.otp_code == otp and 
                now() < self.otp_expires_at)

    def verify_user(self):
        """تایید کاربر پس از وارد کردن کد صحیح"""
        self.is_verified = True
        self.otp_code = None
        self.otp_expires_at = None
        self.save()

    def __str__(self) -> str:
        return str(self.phone_number)

    def has_perm(self, perm, obj=None):
        return self.is_admin
    
    def has_module_perms(self, app_label):
        return self.is_admin
    
    @property
    def is_staff(self):
        return self.is_admin

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=250, null=True, blank=True)
    last_name = models.CharField(max_length=250, null=True, blank=True)
    avatar = models.ImageField(upload_to=upload_to, default='users/default.png')
    bio = models.CharField(max_length=1000, blank=True)
    followers = models.ManyToManyField(CustomUser, related_name='followers')
    following = models.ManyToManyField(CustomUser, related_name='following')
    city = models.ManyToManyField(City, related_name='profiles', blank=True)

    def __str__(self) -> str:
        return str(self.user.phone_number)
    
    @receiver(post_save, sender=CustomUser)
    def create_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

class Hobby(models.Model):
    name = models.CharField(max_length=300)

    def __str__(self) -> str:
        return self.name

class Music(models.Model):
    name = models.CharField(max_length=300)

    def __str__(self) -> str:
        return self.name
    
class Movie(models.Model):
    name = models.CharField(max_length=300)

    def __str__(self) -> str:
        return self.name

class Personality(models.Model):
    fav_music = models.ManyToManyField(Music, related_name='musics', blank=True)
    hobbies = models.ManyToManyField(Hobby, related_name='hobbies', blank=True)
    watched_movies = models.ManyToManyField(Movie, related_name='movies', blank=True)
    social_twitter = models.CharField(max_length=1000, null=True, blank=True)
    social_instagram = models.CharField(max_length=1000, null=True, blank=True)
    user = models.OneToOneField(CustomUser, related_name='personality', on_delete=models.CASCADE)
    
    def __str__(self) -> str:
        return str(self.user.phone_number)
    
    @receiver(post_save, sender=CustomUser)
    def create_personality(sender, instance, created, **kwargs):
        if created:
            Personality.objects.create(user=instance)

class Notification(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()
    foruser = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    
    def __str__(self) -> str:
        return f"{self.title} - {self.foruser.phone_number}"