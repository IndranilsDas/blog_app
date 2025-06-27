from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from .serializers import BlogSerializer

# Create your views here.
from .models import Blog
from rest_framework import viewsets

class BlogViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing blogs.
    """
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned blogs to a given user,
        by filtering against a `user_id` query parameter in the URL.
        """
        queryset = Blog.objects.all()
        user_id = self.request.query_params.get('user_id', None)
        if user_id is not None:
            queryset = queryset.filter(user_id=user_id)
        return queryset
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        blog = serializer.save()
        return Response({
            "blog": BlogSerializer(blog).data,
        }, status=status.HTTP_201_CREATED)  