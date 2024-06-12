from django.conf import settings
from django.db import models
from django.utils.formats import date_format
from datetime import timedelta

class Item(models.Model):
    name = models.CharField(verbose_name='NAME', max_length=100)
    description = models.TextField('DESCRIPTION', max_length=100, blank=True, help_text='simple description text.')

    def __str__(self):
        return self.name

class KeepingService(models.Model):
    items = models.ManyToManyField(Item, related_name='services')
    base_service_period = models.DurationField('BASE SERVICE PERIOD', default=timedelta(days=3))  # 기본값을 3일로 설정
    base_price = models.DecimalField('BASE PRICE', max_digits=10, decimal_places=2)
    additional_price = models.DecimalField('ADDITIONAL PRICE', max_digits=10, decimal_places=2)
    create_dt = models.DateTimeField('CREATE DATE', auto_now_add=True)

    def __name__(self):
        item_names = ', '.join([item.name for item in self.items.all()])
        return item_names

    def __date__(self):
        # '3일' 형태로 날짜 포맷
        return f"{self.base_service_period.days}일"


# user 앱을 만들면 그리로 옮기기

# from django.conf import settings
# from django.db import models
# from django.utils.formats import date_format
# from datetime import timedelta
# from dashboard import KeepingService, Item  # KeepingService와 Item 모델이 정의된 앱

# class Reservation(models.Model):
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reservations')
#     items = models.ManyToManyField(Item, related_name='reservations')
#     service = models.ForeignKey(KeepingService, on_delete=models.CASCADE, related_name='reservations')
#     reservation_date = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.user.username} - {self.service} - {self.reservation_date.strftime('%Y년 %m월 %d일')}"
