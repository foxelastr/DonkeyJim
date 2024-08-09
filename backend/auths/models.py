from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

class Managers(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    class Meta:
        verbose_name = 'Manager'
        verbose_name_plural = 'Managers'
        
    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def create_user_managers(sender, instance, created, **kwargs):
    if created:
        Managers.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_managers(sender, instance, **kwargs):
    instance.managers.save()