from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Event(models.Model):
    title = models.CharField(max_length=255, default='Your title of event')
    content = models.TextField(blank=True)
    city = models.CharField(max_length=255, default='Lviv')
    address = models.TextField(blank=True)
    image = models.ImageField(upload_to='events_images', default='/Users/nadiiapadalka/Downloads/sport_platform/backend/server/media/post_images/img.jpg')
    def __str__(self):
        return self.title