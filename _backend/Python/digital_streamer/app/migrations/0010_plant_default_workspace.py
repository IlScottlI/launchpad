# Generated by Django 3.2.7 on 2021-09-14 12:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0009_link_plant'),
    ]

    operations = [
        migrations.AddField(
            model_name='plant',
            name='default_workspace',
            field=models.IntegerField(null=True),
        ),
    ]
