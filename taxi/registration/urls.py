from django.urls import path
from . import views
urlpatterns = [
    path('', views.index), 
    path('signup/', views.signup, name='signup'),
    path('index/', views.index, name='index'),
]