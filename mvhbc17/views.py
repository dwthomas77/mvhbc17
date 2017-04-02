from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    return render(request, 'mvhbc/home.html', {});

def about(request):
    return render(request, 'mvhbc/about.html', {});

def results_2012(request):
    return render(request, 'mvhbc/results/results_2012.html', {});

def results_2013(request):
    return render(request, 'mvhbc/results/results_2013.html', {});

def results_2014(request):
    return render(request, 'mvhbc/results/results_2014.html', {});

def results_2015(request):
    return render(request, 'mvhbc/results/results_2015.html', {});

def results_2016(request):
    return render(request, 'mvhbc/results/results_2016.html', {});
