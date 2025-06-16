from django.urls import path
from . import views
from .views import send_message

app_name = 'portfolio'

urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('competences/', views.SkillsView.as_view(), name='skills'),
    path('experience/', views.ExperienceView.as_view(), name='experience'),
    path('projets/', views.ProjectsView.as_view(), name='projects'),
    path('contact/', views.ContactView.as_view(), name='contact'),
    path('send-message/', views.send_message, name='send_message'),
]
