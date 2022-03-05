# Generated by Django 4.0.3 on 2022-03-05 11:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nickName', models.CharField(max_length=100)),
                ('content', models.TextField()),
                ('date', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Data',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('location', models.CharField(max_length=200)),
                ('workTime', models.CharField(max_length=100)),
                ('contact', models.CharField(max_length=100)),
                ('content', models.TextField()),
                ('shopType', models.CharField(max_length=100)),
                ('photo', models.ImageField(upload_to='')),
            ],
        ),
    ]
