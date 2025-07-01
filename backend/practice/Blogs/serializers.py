from rest_framework import serializers
from Blogs.models import Blog

class BlogSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    class Meta:
        model = Blog
        fields = ['id', 'title', 'content','image', 'author', 'author_name', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    def get_author_name(self,obj):
        return obj.author.username if obj.author else None

    def create(self, validated_data):
        blog = Blog.objects.create(**validated_data)
        return blog

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.user = validated_data.get('user', instance.user)
        instance.save()
        return instance
    