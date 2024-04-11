from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
def index(request):
    return HttpResponse("<h4>проверка работы</h4>")

def reg(request):
    return render(request, 'registration/registration.html')