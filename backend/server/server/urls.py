from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from rest_framework import routers
from officehoursplus.views import users, tokens, classes, calls
from rest_framework_simplejwt.views import TokenRefreshView

router = routers.DefaultRouter()
router.register(r'users', users.UserViewSet)
router.register(r'classes', classes.ClassViewSet)
router.register(r'mentor_requests', classes.MentorRequestViewSet)
router.register(r'calls', calls.CallViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', tokens.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include(router.urls))
]
