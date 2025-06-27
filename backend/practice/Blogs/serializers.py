from rest_framework import serializers
from Blogs.models import Blog

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['id', 'title', 'content','image', 'author', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        blog = Blog.objects.create(**validated_data)
        return blog

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.user = validated_data.get('user', instance.user)
        instance.save()
        return instance