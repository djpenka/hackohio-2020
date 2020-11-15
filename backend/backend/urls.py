"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('crime/grade', views.get_crime_grade, name="get_crime_grade"),
	path('airquality/grade',views.get_air_quality,name ="get_air_quality"),
	# path('weather/grade',views.get_weather_grade,name = "get_weather_grade"),
	path('disaster/grade',views.get_disaster_grade, name = "get_disaster_grade"),
    path('crime/create', views.create_crime, name="create_crime"),
    path('crime/create/file', views.create_file_crime, name="create_file_crime"),
    path('crime/list', views.list_crime, name="list_crime"),
    path('crime/clear', views.clear_crime, name="clear_crime"),
]
