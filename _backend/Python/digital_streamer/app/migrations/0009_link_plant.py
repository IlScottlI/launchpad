# Generated by Django 3.2.7 on 2021-09-14 12:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_auto_20210914_0739'),
    ]

    operations = [
        migrations.AddField(
            model_name='link',
            name='plant',
            field=models.ManyToManyField(blank=True, related_name='plant_link', to='app.Plant'),
        ),
    ]
