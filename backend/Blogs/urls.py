from django.urls import path, include
from rest_framework import routers
from .views import BlogViewSet, BlogReactionView
from django.conf import settings
from django.conf.urls.static import static


router = routers.DefaultRouter()
router.register(r'your_blogs', BlogViewSet, basename='blogs')
urlpatterns = [
    path('', include(router.urls)),
    path('blogs/<int:blog_id>/react/', BlogReactionView.as_view(), name='blog-react'),
]