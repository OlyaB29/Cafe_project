# Generated by Django 4.1.4 on 2022-12-23 12:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cafe_app', '0002_alter_meal_options_mealclick_person_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='mealclick',
            old_name='person',
            new_name='user',
        ),
    ]
