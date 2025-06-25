from django.db import models
from textblob import TextBlob  # Import TextBlob for sentiment analysis
from django.utils import timezone


class MoodEntry(models.Model):
    MOOD_CHOICES = [
        ('happy', 'Happy'),
        ('sad', 'Sad'),
        ('tired', 'Tired'),
        ('strong', 'Strong'),
        ('glowing', 'Glowing'),
    ]
    mood = models.CharField(max_length=10, choices=MOOD_CHOICES)
    avatar_state = models.CharField(max_length=50, blank=True, null=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.mood} on {self.date}"

    def update_avatar_state(self):
        """Update avatar state based on mood."""
        if self.mood == 'happy':
            self.avatar_state = 'glowing'
        elif self.mood == 'sad':
            self.avatar_state = 'droopy'
        elif self.mood == 'tired':
            self.avatar_state = 'sleepy'
        elif self.mood == 'strong':
            self.avatar_state = 'muscular'
        elif self.mood == 'glowing':
            self.avatar_state = 'radiant'
        else:
            self.avatar_state = 'neutral'

        self.save()

class JournalEntry(models.Model):
    content = models.TextField()  # The journal entry content
    mood_tag = models.CharField(max_length=50)  # Mood tag for the journal entry
    sentiment_score = models.FloatField(default=0.0)  # Sentiment score from analysis
    date = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Sentiment analysis using TextBlob
        blob = TextBlob(self.content)
        self.sentiment_score = blob.sentiment.polarity  # Set the sentiment score (positive, neutral, negative)
        super().save(*args, **kwargs)  # Call the original save method

    def __str__(self):
        return f"Journal on {self.date}"

class Goal(models.Model):
    goal_name = models.CharField(max_length=255)
    is_completed = models.BooleanField(default=False)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.goal_name


class Relationship(models.Model):
    name = models.CharField(max_length=255)  # Person's name (e.g., Partner, Best Friend)
    connection_level = models.FloatField(default=0)  # 0 to 10 scale for how connected the user feels
    date = models.DateField(auto_now_add=True)  # Automatically set the date when the object is created
    
    def __str__(self):
        return f"{self.name} - Connection Level: {self.connection_level}"
    
class BreathingExercise(models.Model):
    name = models.CharField(max_length=255)  # Name of the exercise (e.g., "4-7-8 Breathing")
    description = models.TextField()  # Description of the exercise
    duration_in_minutes = models.PositiveIntegerField(default=5)  # Duration in minutes
    created_at = models.DateTimeField(auto_now_add=True)  # When this exercise was created

    def __str__(self):
        return self.name
    
class MeditationTimer(models.Model):
    name = models.CharField(max_length=255)  # Name of the timer (e.g., "Mindfulness Timer")
    duration_in_minutes = models.PositiveIntegerField(default=10)  # Duration in minutes
    created_at = models.DateTimeField(auto_now_add=True)  # When this timer was created

    def __str__(self):
        return self.name
