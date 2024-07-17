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
