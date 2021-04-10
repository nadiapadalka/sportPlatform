from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from apps.events import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings
from django.conf.urls.static import static

from apps.accounts.urls import accounts_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/', include('apps.events.urls')),
    #url(r'^api/events/$', views.EventView.as_view()),
    url(r'^api/events/$', views.events_list),
    url(r'^api/events/(?P<pk>[0-9]+)$', views.events_detail),

]

urlpatterns += accounts_urlpatterns # add URLs for authentication
# Serving the media files in development mode
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
else:
    urlpatterns += staticfiles_urlpatterns()