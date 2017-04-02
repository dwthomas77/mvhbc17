"""mvhbc17 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from mvhbc17 import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.index, name='index'),
    url(r'^about/', views.about, name='about'),

    # competition results
    url(r'^results/2012/', views.results_2012, name='results_2012'),
    url(r'^results/2013/', views.results_2013, name='results_2013'),
    url(r'^results/2014/', views.results_2014, name='results_2014'),
    url(r'^results/2015/', views.results_2015, name='results_2015'),
    url(r'^results/2016/', views.results_2016, name='results_2016'),
]
