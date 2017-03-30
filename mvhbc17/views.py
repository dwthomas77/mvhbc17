from django.http import HttpResponse


def index(request):
    return HttpResponse("Root of MVHBC Site.")
