from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.conf import settings
from django.core.exceptions import ValidationError

class UserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('The username field must be set')
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, password, **extra_fields)


class User(AbstractUser):
    username = models.CharField(max_length=150, blank=True, null=True, unique=True)
    fullname = models.CharField(max_length=255, blank=True)
    email = models.EmailField(max_length=100)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    # ManyToMany via UserFollowing, with clear reverse name
    following = models.ManyToManyField(
        'self',
        through='UserFollowing',
        symmetrical=False,
        related_name='followed_by'
    )

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []
    objects = UserManager()

    def __str__(self):
        return self.username or f'User {self.pk}'


class UserFollowing(models.Model):
    # the user who is doing the following
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='following_relations',
        on_delete=models.CASCADE
    )
    # the user being followed
    followed_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='follower_relations',
        on_delete=models.CASCADE
    )
    followed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'followed_user')

    def clean(self):
        if self.user == self.followed_user:
            raise ValidationError("You cannot follow yourself.")

    def __str__(self):
        return f"{self.user} follows {self.followed_user}"
