# core/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MoodEntryList, avatar_state, GoalViewSet, JournalEntryViewSet, RelationshipViewSet, BreathingExerciseViewSet, MeditationTimerViewSet, LoginView  # Import the missing viewsets
from .views import clear_all_data


# Create a router and register the viewsets
router = DefaultRouter()
router.register(r'goals', GoalViewSet)
router.register(r'journals', JournalEntryViewSet)
router.register(r'relationships', RelationshipViewSet)
router.register(r'breathing_exercises', BreathingExerciseViewSet)  # Register BreathingExerciseViewSet
router.register(r'meditation_timers', MeditationTimerViewSet)  # Register MeditationTimerViewSet

urlpatterns = [
    path('api/moods/', MoodEntryList.as_view(), name='mood-entry-list'),
    path('api/avatar_state/', avatar_state, name='avatar-state'),
    path('api/', include(router.urls)),  # Include the router URL patterns
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/clear/', clear_all_data, name='clear_all_data'),
]

