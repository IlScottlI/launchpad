# Generated by Django 3.2.7 on 2021-09-14 11:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_linkworkspace_link'),
    ]

    operations = [
        migrations.AlterField(
            model_name='link',
            name='path',
            field=models.URLField(max_length=515),
        ),
    ]
