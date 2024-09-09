from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    path('hanbae/', admin.site.urls),
    path('', views.HomeView.as_view(), name='home'),
    path('api/', include('api.urls')),
    path('dashboard/', include('dashboard.urls')),
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    
# MEDIA 파일을 제공하는 설정 (DEBUG 모드일 때만)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)