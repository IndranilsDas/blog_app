from django.db import models
from Users.models import User
# Create your models here.

class Blog(models.Model):
    title = models.CharField(max_length = 255)
    content = models.TextField()
    image = models.ImageField(upload_to='blogs/', blank=True, null=True)
    tags = models.CharField(max_length=255, blank=True, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)