# Generated by Django 5.2.3 on 2025-06-16 17:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='JournalEntry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('mood_tag', models.CharField(max_length=50)),
                ('sentiment_score', models.FloatField(default=0.0)),
                ('date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='MoodEntry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mood', models.CharField(choices=[('happy', 'Happy'), ('sad', 'Sad'), ('tired', 'Tired'), ('strong', 'Strong'), ('glowing', 'Glowing')], max_length=10)),
                ('date', models.DateField(auto_now_add=True)),
            ],
        ),
    ]
