from django.urls import path, include
from rest_framework import routers
from Blogs.views import BlogViewSet


router = routers.DefaultRouter()
router.register(r'blogs', BlogViewSet, basename='blogs')
urlpatterns = [
    path('', include(router.urls)),
]