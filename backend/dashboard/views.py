from django.shortcuts import render
from dashboard.models import Item
from django.views.generic import ListView

# Create your views here.
class ItemLV(ListView):
    model = Item