# Generated by Django 5.2.3 on 2025-06-19 16:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_moodentry_avatar_state'),
    ]

    operations = [
        migrations.CreateModel(
            name='Goal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('goal_name', models.CharField(max_length=255)),
                ('is_completed', models.BooleanField(default=False)),
                ('date', models.DateField(auto_now_add=True)),
            ],
        ),
    ]
