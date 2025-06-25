# serializers.py

from rest_framework import serializers
from .models import MoodEntry, Goal, Relationship, JournalEntry, BreathingExercise, MeditationTimer  # Import the missing models

class MoodEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodEntry
        fields = ['mood', 'avatar_state', 'date']

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = ['id', 'goal_name', 'is_completed', 'date']

class JournalEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntry
        fields = ['id', 'content', 'mood_tag', 'sentiment_score', 'date']

class RelationshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Relationship
        fields = ['id', 'name', 'connection_level', 'date']

class BreathingExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = BreathingExercise
        fields = ['id', 'name', 'description', 'duration_in_minutes', 'created_at']

class MeditationTimerSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeditationTimer
        fields = ['id', 'name', 'duration_in_minutes', 'created_at']
