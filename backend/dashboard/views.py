from django.shortcuts import render
from django.views.generic import ListView
from .models import KeepingService, LendingService

class DashboardView(ListView):
    template_name = 'dashboard/dashboard.html'
    context_object_name = 'services'

    def get_queryset(self):
        # 여기는 list를 반환해야 함
        keeping_services = list(KeepingService.objects.all())
        lending_services = list(LendingService.objects.all())
        return keeping_services + lending_services  # 임시로 합쳐서 반환, 실제로는 적절히 수정 필요

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['keeping_services'] = KeepingService.objects.all()
        context['lending_services'] = LendingService.objects.all()
        return context
