# Generated by Django 3.2.7 on 2021-10-04 12:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0034_auto_20211004_0644'),
    ]

    operations = [
        migrations.AddField(
            model_name='report',
            name='page',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
