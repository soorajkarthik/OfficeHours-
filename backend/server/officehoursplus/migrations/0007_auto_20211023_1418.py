# Generated by Django 3.2.8 on 2021-10-23 18:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('officehoursplus', '0006_auto_20211023_1402'),
    ]

    operations = [
        migrations.CreateModel(
            name='ClassUserStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time_joined', models.DateTimeField(auto_now_add=True)),
                ('time_left', models.DateTimeField()),
                ('status', models.CharField(choices=[('online', 'online'), ('in_call', 'in_call'), ('session_ended', 'session_ended')], default='online', max_length=30)),
                ('class_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='officehoursplus.classes')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='ClassUserHistory',
        ),
    ]
