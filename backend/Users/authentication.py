from knox.models import AuthToken
from knox.auth import TokenAuthentication
class UserAuthentication(TokenAuthentication):
    """
    A class to handle user authentication using Knox.
    """

    def get_user_from_token(self,token):
        """
        Retrieve the user associated with the given auth token.
        """
        try:
            auth_token = AuthToken.objects.get(token_key=token)
            print("get_user function, user",auth_token.user.username)
            return auth_token.user
        except AuthToken.DoesNotExist:
            return None
    def authenticate(self,request):
        """
        Authenticate a user and return the auth token.
        """
        if 'Token' in request.headers['Authorization']:
            print(request.headers['Authorization'][6:])
            print(request.headers['Authorization'][6:][:15])
            token = request.headers['Authorization'][6:][:15]
            user = self.get_user_from_token(token)
            print("user and token",user, token)
            return user, token
        return None, None