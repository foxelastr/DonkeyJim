# Generated by Django 5.0.6 on 2024-08-09 10:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0007_alter_users_payment_method'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='final_verification',
            field=models.BooleanField(default=False, verbose_name='최종 확인'),
        ),
        migrations.AddField(
            model_name='users',
            name='initial_verification',
            field=models.BooleanField(default=False, verbose_name='1차 확인'),
        ),
    ]