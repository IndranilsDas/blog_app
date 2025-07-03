from rest_framework import serializers
from Blogs.models import Blog
from .models import Reaction
class BlogSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    created = serializers.SerializerMethodField()
    reactions = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    dislikes = serializers.SerializerMethodField()
    profile_image = serializers.ImageField(source='author.profile_picture', read_only=True)
    class Meta:
        model = Blog
        fields = ['id', 'title','tagline', 'content','image', 'author', 'author_name','profile_image','reactions','likes','dislikes', 'created_at', 'created' , 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    def get_author_name(self,obj):
        return obj.author.username if obj.author else None
    
    def get_created(self, obj):
        return obj.created_at.strftime("%A, %d %B %Y") if obj.created_at else None
    
    def get_reactions(self, obj):
        obj.reactions.all()
    def get_likes(self, obj):
        return obj.reactions.filter(type='like').count()
    def get_dislikes(self, obj):
        return obj.reactions.filter(type='dislike').count()    
    def create(self, validated_data):
        blog = Blog.objects.create(**validated_data)
        return blog

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.user = validated_data.get('user', instance.user)
        instance.save()
        return instance
class ReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reaction
        fields = ['type']    

    