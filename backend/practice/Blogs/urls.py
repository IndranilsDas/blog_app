from django.urls import path, include
from rest_framework import routers
from Blogs.views import BlogViewSet
from django.conf import settings
from django.conf.urls.static import static


router = routers.DefaultRouter()
router.register(r'your_blogs', BlogViewSet, basename='blogs')
urlpatterns = [
    path('', include(router.urls)),
]