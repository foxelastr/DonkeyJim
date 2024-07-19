from django.views.generic.list import BaseListView
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UsersSerializer
from dashboard.models import KeepingService, LendingService
from django.http import Http404
from django.utils.translation import gettext as _

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

class CreateReservationView(APIView):
    def post(self, request, format=None):
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)