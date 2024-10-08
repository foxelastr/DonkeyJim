from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.views import View
from django.views.generic.list import BaseListView
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UsersSerializer
from dashboard.models import KeepingService, LendingService, Users
from auths.models import Managers
from django.http import Http404
import json
from django.utils.translation import gettext as _
from django.middleware.csrf import get_token

class ApiItemsLV(BaseListView):
    def get_queryset(self):
        return []

    def get(self, request, *args, **kwargs):
        self.object_list = self.get_queryset()
        allow_empty = self.get_allow_empty()

        keeping_services = list(KeepingService.objects.values('name', 'description', 'base_price', 'additional_price', 'main_image', 'detail_image', 'create_dt'))
        lending_services = list(LendingService.objects.values('name', 'description', 'base_price', 'additional_price', 'main_image', 'detail_image', 'create_dt'))

        if not allow_empty and not (keeping_services or lending_services):
            raise Http404(
                _("Empty list and “%(class_name)s.allow_empty” is False.")
                % {
                    "class_name": self.__class__.__name__,
                }
            )
            
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

        # 동일한 이름과 전화번호를 가진 기존 예약이 있는지 확인
        existing_user = Users.objects.filter(name=request.data.get('name'), phone_number=request.data.get('phone_number')).exists()

        if existing_user:
            # 새로운 예약을 생성할 때 change_status를 True로 설정
            serializer = UsersSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(change_status=True)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            # 새로운 예약을 생성하는 경우 (change_status는 기본값 False)
            serializer = UsersSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ReservationCheckAPIView(View):
    def get(self, request):
        name = request.GET.get('name')
        phone_number = request.GET.get('phone_number')

        if not name or not phone_number:
            return JsonResponse({'error': 'Name and phone number are required.'}, status=400)

        # Manager에 있는 사용자 확인
        manager_exists = Managers.objects.filter(user__username=name, phone_number=phone_number).exists()
        
        print("manager_exists is : ", manager_exists)

        if manager_exists:
            today = timezone.localtime().date()
            
            # 매니저의 경우 오늘 날짜로 필터링
            reservations_start = Users.objects.filter(start_date=today)
            reservations_end = Users.objects.filter(end_date=today)
            
            # 두 QuerySet을 합치고 중복 제거
            reservations = (reservations_start | reservations_end).distinct()
            
        else:
            # 매니저가 아닌 사용자는 모든 예약 내역 반환
            reservations = Users.objects.filter(name=name, phone_number=phone_number)

        if reservations.exists():
            response_data = []
            for user in reservations:
                response_data.append({
                    'id': user.id,
                    'name': user.name,
                    'is_manager': manager_exists,
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
                    'payment_method': user.payment_method,
                    'change_status': user.change_status,
                    'initial_verification': user.initial_verification,
                    'final_verification': user.final_verification,
                })
            return JsonResponse({
                    'is_manager': manager_exists,
                    'response_data': response_data
                })
        else:
            return JsonResponse({'error': 'No reservations found.'}, status=404)

class UpdateInitialVerificationView(APIView):
    def post(self, request, user_id):
        try:
            user = Users.objects.get(id=user_id)
            user.initial_verification = True
            user.save()
            return Response({'message': 'Initial verification updated successfully.'}, status=status.HTTP_200_OK)
        except Users.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

class UpdateFinalVerificationView(APIView):
    def post(self, request, user_id):
        try:
            user = Users.objects.get(id=user_id)
            user.final_verification = True
            user.save()
            return Response({'message': 'Final verification updated successfully.'}, status=status.HTTP_200_OK)
        except Users.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)