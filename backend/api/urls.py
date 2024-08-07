from django.urls import path
from . import views

app_name = 'api'
urlpatterns = [
    path('dashboard/', views.ApiItemsLV.as_view(), name='dashboard'),
    path('reservation/', views.CreateReservationView.as_view(), name='reservation'),
    path('items/', views.ServiceListView.as_view(), name='get_services'),
    path('reservcheck/', views.ReservationCheckAPIView.as_view(), name='reservcheck'),
    path('update/<int:id>/', views.ReservationUpdateAPIView.as_view(), name='reservation_update'),
    path('csrf_token/', views.get_csrf_token, name='csrf_token'),
]
