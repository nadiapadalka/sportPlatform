# Generated by Django 3.1.2 on 2021-05-16 06:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0007_auto_20210516_0600'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='availablePlaces',
            field=models.IntegerField(default=5),
        ),
    ]
