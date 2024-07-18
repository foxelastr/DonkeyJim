from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from django.views.generic import TemplateView
from . import views

app_name = 'dashboard'
urlpatterns = [
    path('serviceinfo/', views.DashboardView.as_view(), name='dashboard'),
    path('reservation/', TemplateView.as_view(template_name='dashboard/dashboard.html'), name='reservation'),
    path('reservcheck/', TemplateView.as_view(template_name='dashboard/dashboard.html'), name='reservation_check'),
    path('faqs/', TemplateView.as_view(template_name='dashboard/dashboard.html'), name='freq_asked_qstn'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
