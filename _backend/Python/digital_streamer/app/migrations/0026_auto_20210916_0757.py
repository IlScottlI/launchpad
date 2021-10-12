# Generated by Django 3.2.7 on 2021-09-16 11:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0025_auto_20210916_0754'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='link',
            name='plant',
        ),
        migrations.AddField(
            model_name='link',
            name='plant',
            field=models.ForeignKey(blank=True, default=1, on_delete=django.db.models.deletion.CASCADE, related_name='plant_link', to='app.plant'),
            preserve_default=False,
        ),
    ]
