# Generated by Django 3.2.7 on 2021-10-04 12:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0035_report_page'),
    ]

    operations = [
        migrations.RenameField(
            model_name='report',
            old_name='page',
            new_name='tab',
        ),
    ]