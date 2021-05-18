# Generated by Django 3.1.2 on 2021-05-16 06:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0006_auto_20210419_2034'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='capacity',
            field=models.IntegerField(default=5),
        ),
        migrations.AddField(
            model_name='event',
            name='category',
            field=models.CharField(default='Your title of event', max_length=255),
        ),
    ]
