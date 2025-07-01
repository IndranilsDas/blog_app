from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from .serializers import BlogSerializer
from .models import Blog
from rest_framework import viewsets
from Users.authentication import UserAuthentication

class BlogViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing blogs.
    """
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    authentication_classes = [UserAuthentication]

    def get_queryset(self):
        """
        Optionally restricts the returned blogs to a given user,
        by filtering against a `user_id` query parameter in the URL.
        """
        print("User: ", self.request.user)
        #queryset = Blog.objects.filter(author=self.request.user)
        queryset = Blog.objects.all()
        return queryset
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        blog = serializer.save()
        return Response({
            "blog": BlogSerializer(blog).data,
        }, status=status.HTTP_201_CREATED)  