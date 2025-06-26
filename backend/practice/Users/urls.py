from rest_framework import routers
from django.urls import path, include

from Users.views import UsersReg
router = routers.DefaultRouter()
router.register(r'register', UsersReg, basename='users')

urlpatterns = [
    path('', include(router.urls)),
]