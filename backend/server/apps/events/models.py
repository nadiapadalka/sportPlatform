from django.db import models
from django.contrib.auth import get_user_model
from jsonfield import JSONField
from django.utils.timezone import now
User = get_user_model()

class Event(models.Model):
    title = models.CharField(max_length=255, default='Your title of event')
    content = models.TextField(blank=True)
    city = models.CharField(max_length=255, default='Lviv')
    address = models.TextField(blank=True)
    creator = models.CharField(max_length=255, default='creator')
    image = models.ImageField(blank=True, upload_to='events_images', default='/Users/nadiiapadalka/Downloads/sport_platform/backend/server/media/post_images/img.jpg')
    subscribedUsers = JSONField(default={'usernames':{}}, blank =True)
    capacity = models.IntegerField(default=5)
    availablePlaces = models.IntegerField(default=5)
    category = models.CharField(max_length=255, default='category')
    latitude = models.FloatField(default=0)
    longitude = models.FloatField(default=0)
    date = models.DateTimeField(default=now, editable=False)
    def __str__(self):
        return self.title