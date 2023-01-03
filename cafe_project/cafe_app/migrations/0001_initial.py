# Generated by Django 4.1.4 on 2022-12-22 10:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Meal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Название блюда')),
                ('description', models.TextField(verbose_name='Описание блюда')),
                ('price', models.IntegerField(verbose_name='Стоимость блюда')),
                ('size', models.IntegerField(verbose_name='Граммовка блюда')),
                ('meal_type', models.CharField(choices=[('Горячие блюда', 'Hot Meals'), ('Напитки', 'Drink'), ('Десерты', 'Dessert'), ('NO_TYPE', 'No Type')], default='NO_TYPE', max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='MealClick',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('click_date', models.DateTimeField(verbose_name='Дата клика')),
                ('meal', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='cafe_app.meal')),
            ],
        ),
    ]
