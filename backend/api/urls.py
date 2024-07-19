from django.urls import path
from . import views

app_name = 'api'
urlpatterns = [
    path('dashboard/', views.ApiItemsLV.as_view(), name='dashboard'),
    path('reservation/', views.CreateReservationView.as_view(), name='reservation'),
]
