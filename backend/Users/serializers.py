from rest_framework import serializers
from Users.models import User, UserFollowing
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

class UserDetailSerializer(serializers.ModelSerializer):
    following_count = serializers.SerializerMethodField()
    followers_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'fullname', 'email', 'profile_picture', 'bio', 'following_count', 'followers_count']
        read_only_fields = ['id', 'following_count', 'followers_count']

    def get_following_count(self, obj):
        return obj.following.count()

    def get_followers_count(self, obj):
        return obj.followed_by.count()
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid credentials")

class UserFollowingSerializer(serializers.ModelSerializer):
    followers_count = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()

    class Meta:
        model = User.following.through
        fields = ['user', 'followed_user', 'followed_at', 'followers_count', 'followers']
        read_only_fields = ['followed_at', 'followers_count', 'followers']

    def get_followers_count(self, obj):
        # count how many records follow the same followed_user
        return UserFollowing.objects.filter(followed_user=obj.followed_user).count()

    def get_followers(self, obj):
        # get the usernames of everyone following this same followed_user
        return list(
            UserFollowing.objects
            .filter(followed_user=obj.followed_user)
            .values_list('user__username', flat=True)
        )

    def create(self, validated_data):
        return UserFollowing.objects.create(**validated_data)

    def validate(self, data):
        if data['user'] == data['followed_user']:
            raise serializers.ValidationError("You cannot follow yourself.")
        return data
