from django.http import HttpRequest
from django.http import JsonResponse
from rest_framework.response import Response  
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import GenericAPIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from .serializers import UserSerializer
from .serializers import UserRegisterSerializer
from .serializers import LogoutSerializer




class UserDetailsView(APIView):
    """ Get Basic information about user"""
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user #retrieve authenticated user
        serializer = UserSerializer(user)
        return Response(serializer.data)

class UserAuthTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.email
        token['email'] = user.email

        return token
    
class UserAuthTokenObtainPairView(TokenObtainPairView):
    """API Endpoint for logging user in"""
    serializer_class = UserAuthTokenObtainPairSerializer

class RegisterUserView(GenericAPIView):



    """API Endpoint used for registering users
        Email, first_name, last_name, password, password_2 are required.
        Only accepts post request.
    """
    serializer_class = UserRegisterSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "details": "User registered successfully", 
                "user_id": user.id}, 
                status=status.HTTP_201_CREATED
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    """
    API View for logging out a user.
    Only authenticated users can log out.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Serialize the incoming data
        serializer = LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Get the refresh token and access token from the serialized data
        refresh_token = serializer.validated_data['refresh_token']
        access_token = serializer.validated_data['access_token']

        # Blacklist both refresh token and access token
        try:
            RefreshToken(refresh_token).blacklist()
            AccessToken().from_token_string(access_token).blacklist()
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

       

        return Response({'detail':'User Successfully Logged out'}, status=status.HTTP_200_OK)