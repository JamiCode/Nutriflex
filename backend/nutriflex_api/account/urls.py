from django.urls import path
from . import views
from rest_framework_simplejwt.views import( 
    TokenRefreshView
)

urlpatterns = [
    path('create', views.RegisterUserView.as_view(), name='register'),
    path('token', views.TokenObtainPairView.as_view(), name='token_access'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout', views.LogoutView.as_view(), name="logout" ),
    path('me', views.UserDetailsView.as_view(), name='user-information')
]