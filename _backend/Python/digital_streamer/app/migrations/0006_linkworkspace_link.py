# Generated by Django 3.2.7 on 2021-09-14 11:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_link_linkworkspace'),
    ]

    operations = [
        migrations.AddField(
            model_name='linkworkspace',
            name='link',
            field=models.ManyToManyField(blank=True, related_name='link_link_workspace', to='app.Link'),
        ),
    ]
