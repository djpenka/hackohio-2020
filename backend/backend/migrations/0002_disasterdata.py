# Generated by Django 3.1.3 on 2020-11-15 07:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='DisasterData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('state_code', models.TextField()),
                ('incident_type', models.TextField()),
                ('disaster_name', models.TextField()),
            ],
        ),
    ]