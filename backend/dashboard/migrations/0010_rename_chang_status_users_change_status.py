# Generated by Django 5.0.6 on 2024-08-11 09:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0009_users_chang_status_alter_users_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='users',
            old_name='chang_status',
            new_name='change_status',
        ),
    ]
