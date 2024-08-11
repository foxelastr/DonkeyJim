from django.urls import path
from . import views

app_name = 'api'
urlpatterns = [
    path('dashboard/', views.ApiItemsLV.as_view(), name='dashboard'),
    path('reservation/', views.CreateReservationView.as_view(), name='reservation'),
    path('items/', views.ServiceListView.as_view(), name='get_services'),
    path('reservcheck/', views.ReservationCheckAPIView.as_view(), name='reservcheck'),
    path('update-initial-verification/<int:user_id>/', views.UpdateInitialVerificationView.as_view(), name='update_initial_verification'),
    path('update-final-verification/<int:user_id>/', views.UpdateFinalVerificationView.as_view(), name='update_final_verification'),
    ]
