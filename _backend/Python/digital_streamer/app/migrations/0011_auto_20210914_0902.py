# Generated by Django 3.2.7 on 2021-09-14 13:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_plant_default_workspace'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='area',
            field=models.ManyToManyField(blank=True, related_name='user_area', to='app.Area'),
        ),
        migrations.AddField(
            model_name='user',
            name='business',
            field=models.ManyToManyField(blank=True, related_name='user_business', to='app.Business'),
        ),
        migrations.AddField(
            model_name='user',
            name='default_workspace',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='department',
            field=models.ManyToManyField(blank=True, related_name='user_department', to='app.Department'),
        ),
        migrations.AddField(
            model_name='user',
            name='module',
            field=models.ManyToManyField(blank=True, related_name='user_module', to='app.Module'),
        ),
    ]