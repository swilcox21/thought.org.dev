# Generated by Django 4.0 on 2022-02-10 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='folder',
            name='toggle',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='thought',
            name='thought',
            field=models.CharField(max_length=5000),
        ),
    ]
