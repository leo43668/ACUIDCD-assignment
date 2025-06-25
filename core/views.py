# views.py

from rest_framework import generics, viewsets
from django.http import JsonResponse
from .models import MoodEntry, Goal, Relationship, JournalEntry, BreathingExercise, MeditationTimer
from .serializers import MoodEntrySerializer, GoalSerializer, RelationshipSerializer, JournalEntrySerializer, BreathingExerciseSerializer, MeditationTimerSerializer
from rest_framework.response import Response  # Correct import
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import MoodEntry, Goal, JournalEntry

# API for listing mood entries
class MoodEntryList(generics.ListCreateAPIView):
    queryset = MoodEntry.objects.all()
    serializer_class = MoodEntrySerializer

# API for avatar state
def avatar_state(request):
    latest_mood = MoodEntry.objects.last()
    avatar_state = latest_mood.avatar_state if latest_mood else "neutral"
    return JsonResponse({"avatar_state": avatar_state})

# Goal API ViewSet
class GoalViewSet(viewsets.ModelViewSet):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer

# Relationship API ViewSet
class RelationshipViewSet(viewsets.ModelViewSet):
    queryset = Relationship.objects.all()
    serializer_class = RelationshipSerializer

    # Action to update relationship connection level
    @action(detail=True, methods=['patch'])
    def update_connection(self, request, pk=None):
        relationship = self.get_object()
        new_connection_level = request.data.get('connection_level', None)

        if new_connection_level is not None:
            relationship.connection_level = new_connection_level
            relationship.save()
            return Response({"status": "success", "new_connection_level": new_connection_level})
        else:
            return Response({"error": "No connection level provided"}, status=400)

# Journal Entry API ViewSet
class JournalEntryViewSet(viewsets.ModelViewSet):
    queryset = JournalEntry.objects.all()
    serializer_class = JournalEntrySerializer

# Breathing Exercise API ViewSet
class BreathingExerciseViewSet(viewsets.ModelViewSet):
    queryset = BreathingExercise.objects.all()
    serializer_class = BreathingExerciseSerializer

# Meditation Timer API ViewSet
class MeditationTimerViewSet(viewsets.ModelViewSet):
    queryset = MeditationTimer.objects.all()
    serializer_class = MeditationTimerSerializer

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if username == 'admin' and password == 'secret123':
            return Response({'token': 'dummy-token-12345'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def clear_all_data(request):
    MoodEntry.objects.all().delete()
    Goal.objects.all().delete()
    JournalEntry.objects.all().delete()
    return Response({"message": "All data cleared."})
