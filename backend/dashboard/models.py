from django.db import models

class KeepingService(models.Model):
    name = models.CharField(verbose_name='NAME', max_length=100, default='default_name')
    description = models.TextField('DESCRIPTION', blank=True, help_text='simple description text.')
    base_price = models.IntegerField('BASE PRICE')
    additional_price = models.IntegerField('ADDITIONAL PRICE')
    create_dt = models.DateTimeField('CREATE DATE', auto_now_add=True)

    def __str__(self):
        return self.name

class LendingService(models.Model):
    name = models.CharField(verbose_name='NAME', max_length=100, default='default_name')
    description = models.TextField('DESCRIPTION', blank=True, help_text='simple description text.')
    base_price = models.IntegerField('BASE PRICE')
    additional_price = models.IntegerField('ADDITIONAL PRICE')
    create_dt = models.DateTimeField('CREATE DATE', auto_now_add=True)

    def __str__(self):
        return self.name

class Users(models.Model):
    name = models.CharField(max_length=100, default='')
    phone_number = models.CharField(max_length=15)
    keeping_services = models.JSONField(default=list)
    keeping_quantities = models.JSONField(default=list)
    lending_services = models.JSONField(default=list)
    lending_quantities = models.JSONField(default=list)
    start_date = models.DateField()
    end_date = models.DateField()
    start_time = models.TimeField(default="00:00:00")
    end_time = models.TimeField(default="00:00:00")  # 기본값 설정
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    terms_agreed = models.BooleanField(default=False)
    payment_method = models.CharField(max_length=15, default='')
    change_status = models.BooleanField(default=False, verbose_name="변경여부")
    initial_verification = models.BooleanField(default=False, verbose_name="1차 확인")
    final_verification = models.BooleanField(default=False, verbose_name="최종 확인")

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.name

