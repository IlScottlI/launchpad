# Generated by Django 3.2.7 on 2021-09-10 14:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_snippet'),
    ]

    operations = [
        migrations.AddField(
            model_name='stream',
            name='owner',
            field=models.ManyToManyField(blank=True, related_name='owner_stream', to='app.User'),
        ),
    ]