from django.shortcuts import get_object_or_404
from django.views import View
from django.views.generic.list import BaseListView
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UsersSerializer
from dashboard.models import KeepingService, LendingService, Users
from django.http import Http404
import json
from django.utils.translation import gettext as _
from django.middleware.csrf import get_token

class ApiItemsLV(BaseListView):
    print("API_ITEMS_LV beginning 1\n")
    
    def get_queryset(self):
        return []

    def get(self, request, *args, **kwargs):
        print("API_ITEMS_LV beginning 2\n")
        self.object_list = self.get_queryset()
        allow_empty = self.get_allow_empty()

        keeping_services = list(KeepingService.objects.values('name', 'description', 'base_price', 'additional_price', 'create_dt'))
        lending_services = list(LendingService.objects.values('name', 'description', 'base_price', 'additional_price', 'create_dt'))

        if not allow_empty and not (keeping_services or lending_services):
            raise Http404(
                _("Empty list and “%(class_name)s.allow_empty” is False.")
                % {
                    "class_name": self.__class__.__name__,
                }
            )
            
        print("rendering items...\n")

        items = {
            'keeping_services': keeping_services,
            'lending_services': lending_services,
        }
        
        
        return JsonResponse(data=items, safe=False, status=200)
    
class ServiceListView(View):
    def get(self, request, *args, **kwargs):
        keeping_services = list(KeepingService.objects.values('name', 'description', 'base_price', 'additional_price'))
        lending_services = list(LendingService.objects.values('name', 'description', 'base_price', 'additional_price'))

        data = {
            'keeping_services': keeping_services,
            'lending_services': lending_services,
        }
        return JsonResponse(data)

class CreateReservationView(APIView):
    def post(self, request, format=None):
        print(request.data)
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ReservationCheckAPIView(View):
    def get(self, request):
        name = request.GET.get('name')
        phone_number = request.GET.get('phone_number')

        if not name or not phone_number:
            return JsonResponse({'error': 'Name and phone number are required.'}, status=400)

        try:
            user = Users.objects.get(name=name, phone_number=phone_number)
            response_data = {
                'id': user.id,
                'name': user.name,
                'phone_number': user.phone_number,
                'keeping_services': user.keeping_services,
                'keeping_quantities': user.keeping_quantities,
                'lending_services': user.lending_services,
                'lending_quantities': user.lending_quantities,
                'start_date': user.start_date,
                'end_date': user.end_date,
                'start_time': user.start_time,
                'end_time': user.end_time,
                'total_price': user.total_price,
            }
            return JsonResponse(response_data)
        except Users.DoesNotExist:
            return JsonResponse({'error': 'User not found.'}, status=404)

class ReservationUpdateAPIView(View):
    def get(self, request, id):
        user = get_object_or_404(Users, id=id)
        response_data = {
            'id': user.id,
            'name': user.name,
            'phone_number': user.phone_number,
            'keeping_services': user.keeping_services,
            'keeping_quantities': user.keeping_quantities,
            'lending_services': user.lending_services,
            'lending_quantities': user.lending_quantities,
            'start_date': user.start_date,
            'end_date': user.end_date,
            'start_time': user.start_time,
            'end_time': user.end_time,
            'total_price': user.total_price,
        }
        return JsonResponse(response_data)

    def put(self, request, id):
        data = json.loads(request.body)
        user = get_object_or_404(Users, id=id)

        user.keeping_services = data.get('keeping_services', user.keeping_services)
        user.keeping_quantities = data.get('keeping_quantities', user.keeping_quantities)
        user.lending_services = data.get('lending_services', user.lending_services)
        user.lending_quantities = data.get('lending_quantities', user.lending_quantities)
        user.start_date = data.get('start_date', user.start_date)
        user.end_date = data.get('end_date', user.end_date)
        user.start_time = data.get('start_time', user.start_time)
        user.end_time = data.get('end_time', user.end_time)
        user.total_price = data.get('total_price', user.total_price)

        user.save()

        return JsonResponse({'message': 'Reservation updated successfully'})
    
def get_csrf_token(request):
    token = get_token(request)
    print("TOKEN is : ", token)
    return JsonResponse({'csrfToken': token})