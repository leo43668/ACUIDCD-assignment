from rest_framework import serializers
from .models import MoodEntry

class MoodEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodEntry
        fields = ['mood', 'avatar_state', 'date']
