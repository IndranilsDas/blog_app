from django.shortcuts import render
from rest_framework import viewsets, generics
from Users.models import User
from Users.serializers import UserSerializer, LoginSerializer
from rest_framework.response import Response
from rest_framework import status
from knox.models import AuthToken

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
        print(self.request.data)
        serializer = self.get_serializer(data=request.data)
        print("serializer : ",type(serializer))
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = AuthToken.objects.create(user)[1]
        return Response({
            "user": UserSerializer(user).data,
            "token": token
        },status=status.HTTP_201_CREATED)
    
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data  # the authenticated User instance
        _, token = AuthToken.objects.create(user)  # returns (AuthToken instance, token string)
        return Response({
            "user": UserSerializer(user).data,
            "token": token
        }, status=status.HTTP_200_OK)