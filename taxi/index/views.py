from django.shortcuts import render,redirect
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponse
# Create your views here.
def index(request):
    return HttpResponse("<h4>проверка работы</h4>")