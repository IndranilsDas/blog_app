from django.shortcuts import render
from rest_framework import viewsets
from Users.models import User
from Users.serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class UsersReg(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing users.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned users to a given user,
        by filtering against a `id` query parameter in the URL.
        """
        queryset = User.objects.all()
        id = self.request.query_params.get('id', None)
        if id is not None:
            queryset = queryset.filter(id=id)
        return queryset
    def create(self, request, *args, **kwargs):
        print("inside create")
        """
        Create a new user.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)