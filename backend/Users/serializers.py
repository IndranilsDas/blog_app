from rest_framework import serializers
from Users.models import User
from django.contrib.auth import authenticate


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username","email","password"]
        read_only_fields = ['id', 'is_staff', 'is_active']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        instance.fullname = validated_data.get('fullname', instance.fullname)
        instance.email = validated_data.get('email', instance.email)
        instance.save()
        return instance
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid credentials")

class UserFollowingSerializer(serializers.ModelSerializer):
    followers = serializers.SerializerMethodField()
    class Meta:
        model = User.following.through
        fields = ['user', 'followed_user', 'followed_at', 'followers']
        read_only_fields = ['followed_at']
    def get_followers(self, obj):
        return obj.followed_.count()

    def create(self, validated_data):
        user_following = User.following.through.objects.create(**validated_data)
        return user_following

    def validate(self, data):
        if data['user'] == data['followed_user']:
            raise serializers.ValidationError("You cannot follow yourself.")
        return data    