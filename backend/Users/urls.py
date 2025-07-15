from rest_framework import routers
from django.urls import path, include
from Users.views import *

from Users.views import UsersReg
router = routers.DefaultRouter()
router.register(r'register', UsersReg, basename='users')
router.register(r'following', UserFollwingViewSet, basename='user-following')
router.register(r'allusers', AllUsersViewSet, basename='all-users')


urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginAPI.as_view(), name='login'),
    path('current/', GetCurrentUserViewSet.as_view(), name='user-detail'),
]