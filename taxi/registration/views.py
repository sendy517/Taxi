from django.shortcuts import render,redirect
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponse
# Create your views here.
def index(request):
    return HttpResponse("<h4>проверка работы</h4>")

def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            # Редирект после успешной регистрации
            return redirect('index')
    else:
        form = UserCreationForm()
    return render(request, 'registration/registration.html', {'form': form})