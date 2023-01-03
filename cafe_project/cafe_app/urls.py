from django.urls import path
from . import views


app_name = 'cafe_app'
urlpatterns = [
    path('', views.menu, name='menu'),
    path('menu', views.menu, name='menu'),
    path('statistics', views.statistics, name='statistics'),
    path('category_statistics', views.category_statistics, name='category_statistics'),
    path('meal_statistics/<int:meal_id>', views.meal_statistics, name='meal_statistics'),
    path('<meal_category>', views.meal_category, name='meal_category'),
    path('<int:meal_id>/meal', views.meal, name='meal'),

]