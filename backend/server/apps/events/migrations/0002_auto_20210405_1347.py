# Generated by Django 3.1.2 on 2021-04-05 13:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='event',
            name='created_by',
        ),
    ]
