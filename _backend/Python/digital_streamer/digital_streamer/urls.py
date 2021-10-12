from django.urls import path, include
from django.contrib import admin

admin.site.site_url = 'http://localhost:3000/launchpad'  

urlpatterns = [
    path('api/', include('app.urls')),
    path('admin/', admin.site.urls),
]

