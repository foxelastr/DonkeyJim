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
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    keeping_service = models.CharField(max_length=100, null=True, blank=True)
    lending_service = models.CharField(max_length=100, null=True, blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    terms_agreed = models.BooleanField(default=False)
    
    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
    
    def __str__(self):
        return self.name