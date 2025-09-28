from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Include the API app's URLs under the 'api/' path.
    path('api/', include('api.urls')),
    path('api/auth/', include('accounts.urls')),
]
