from django.urls import path

from dashboard import views


app_name = 'dashboard'
urlpatterns = [
    path('item/list/', views.ItemLV.as_view(), name='item_list'),
]
