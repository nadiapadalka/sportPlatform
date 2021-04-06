from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from apps.events import views

from apps.accounts.urls import accounts_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('apps.events.urls')),
    url(r'^api/events/$', views.EventView.as_view()),
]

urlpatterns += accounts_urlpatterns # add URLs for authentication
