from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from .serializers import BlogSerializer
from .models import Blog
from rest_framework import viewsets
from Users.authentication import UserAuthentication
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Blog, Reaction
from .serializers import ReactionSerializer

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

class BlogReactionView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [UserAuthentication]
   
    def post(self, request, blog_id):
        try:
            blog = Blog.objects.get(id=blog_id)
        except Blog.DoesNotExist:
            return Response({"detail": "Blog not found."}, status=status.HTTP_404_NOT_FOUND)

        reaction_type = request.data.get('type')
        if reaction_type not in ['like', 'dislike']:
            return Response({"detail": "Invalid reaction type."}, status=status.HTTP_400_BAD_REQUEST)

        reaction, created = Reaction.objects.get_or_create(blog=blog, user=request.user)

        if not created:
            if reaction.type == reaction_type:
                reaction.delete()  # Toggle off
                return Response({"detail": "Reaction removed."})
            else:
                reaction.type = reaction_type
                reaction.save()
                return Response({"detail": f"Reaction changed to {reaction_type}."})

        reaction.type = reaction_type
        reaction.save()
        return Response({"detail": f"Reacted with {reaction_type}."}, status=status.HTTP_201_CREATED)
