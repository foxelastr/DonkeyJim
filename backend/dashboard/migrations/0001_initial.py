# Generated by Django 5.0.6 on 2024-06-12 12:08

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='NAME')),
                ('description', models.TextField(blank=True, help_text='simple description text.', max_length=100, verbose_name='DESCRIPTION')),
            ],
        ),
        migrations.CreateModel(
            name='KeepingService',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('base_service_period', models.DurationField(default=datetime.timedelta(days=3), verbose_name='BASE SERVICE PERIOD')),
                ('base_price', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='BASE PRICE')),
                ('additional_price', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='ADDITIONAL PRICE')),
                ('create_dt', models.DateTimeField(auto_now_add=True, verbose_name='CREATE DATE')),
                ('items', models.ManyToManyField(related_name='services', to='dashboard.item')),
            ],
        ),
    ]
