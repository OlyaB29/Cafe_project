from django.contrib.auth.models import User
from django.db.models import Count, OuterRef, Subquery
from django.utils import timezone
from qsstats import QuerySetStats
from rest_framework.response import Response
from .models import Meal, MealClick
from rest_framework import viewsets, permissions
from .serializers import MealSerializer, TopMealSerializer, TopUserSerializer


class MenuViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def list(self, request, *args, **kwargs):
        meal_categories = list(filter(lambda el: 'NO_TYPE' not in el[0], Meal.MealType.choices))
        return Response(meal_categories)


class MealViewSet(viewsets.ModelViewSet):
    serializer_class = MealSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        index = Meal.MealType.names.index(self.kwargs['meal_category'])
        return Meal.objects.filter(meal_type=Meal.MealType.values[index])


class TopMealViewSet(viewsets.ModelViewSet):
    serializer_class = TopMealSerializer
    permission_classes = [permissions.AllowAny]
    queryset = Meal.objects.annotate(click_count=Count('mealclick')).order_by('-click_count')[:3]


class TopUserViewSet(viewsets.ModelViewSet):
    serializer_class = TopUserSerializer
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.annotate(user_click_count=Count('mealclick')).order_by('-user_click_count')


class TopUserCategoryViewSet(viewsets.ModelViewSet):
    serializer_class = TopUserSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        index = Meal.MealType.names.index(self.kwargs['meal_category'])
        clicks = MealClick.objects.filter(meal__meal_type=Meal.MealType.values[index], user=OuterRef("pk"))
        clicks_v = clicks.values('user')
        click_count = clicks_v.annotate(c=Count('*')).values('c')

        if self.request.GET.get('user_count'):
            top_users = User.objects.filter(mealclick__in=clicks).distinct().annotate(
                user_click_count=Subquery(click_count)).order_by(
                '-user_click_count')[:int(self.request.GET.get('user_count'))]
        else:
            top_users = User.objects.filter(mealclick__in=clicks).distinct().annotate(
                user_click_count=Subquery(click_count)).order_by(
                '-user_click_count')

        return top_users


class MealStatisticsViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def list(self, request, *args, **kwargs):
        clicks = MealClick.objects.filter(meal=self.kwargs['meal_id'])
        interval = "days"
        num = 7
        if request.GET.get('num'):
            num = int(request.GET.get('num'))
        end_date = timezone.now()

        delta = timezone.timedelta(days=num)

        period_data = {"Часы": ("hours", timezone.timedelta(hours=num)),
                       "Дни": ("days", timezone.timedelta(days=num)),
                       "Недели": ("weeks", timezone.timedelta(weeks=num)),
                       "Месяцы": ("months", timezone.timedelta(days=num * 30))}
        if request.GET.get('period'):
            interval = period_data[request.GET.get('period')][0]
            delta = period_data[request.GET.get('period')][1]

        start_date = end_date - delta

        if interval == "hours":
            date_format = "M j G:i"
        else:
            date_format = "M j"

        qsstats = QuerySetStats(clicks, date_field='click_date', aggregate=Count('id'))
        stat_values = qsstats.time_series(start_date, end_date, interval=interval)

        stat_data = []

        for key, value in stat_values:
            stat_data.append({'date':key, 'click_count':value})

        return Response(stat_data)