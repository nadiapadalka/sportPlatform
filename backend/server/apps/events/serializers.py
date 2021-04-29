from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('pk','title', 'content', 'city', 'address','image','subscribedUsers','latitude','longitude','creator')
