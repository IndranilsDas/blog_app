from django.urls import path, include
from rest_framework import routers
from .views import BlogViewSet, BlogReactionView,SpacesViewSet
from django.conf import settings
from django.conf.urls.static import static


router = routers.DefaultRouter()
router.register(r'all_blogs', BlogViewSet, basename='blogs')
router.register(r'spaces', SpacesViewSet, basename='spaces')  # Assuming you want to use the same viewset for spaces
urlpatterns = [
    path('', include(router.urls)),
    path('react/<int:blog_id>/', BlogReactionView.as_view(), name='blog-react'),
]