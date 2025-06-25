from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from django.db import models
import os
import django
from asgiref.sync import sync_to_async
import random
from rasa_sdk import Action
from rasa_sdk.executor import CollectingDispatcher

# Add the necessary Django settings for Rasa
os.environ['DJANGO_SETTINGS_MODULE'] = 'mental_health_app.settings'
django.setup()

# Import Django models
from core.models import MoodEntry, Goal

class ActionLogMood(Action):
    def name(self) -> str:
        return "action_log_mood"

    async def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: dict) -> list:
        # Extract mood from user input
        mood = tracker.latest_message['text']
        
        # Log the mood to the Django database
        await sync_to_async(MoodEntry.objects.create)(mood=mood)
        
        # Notify user about mood logging
        dispatcher.utter_message(text=f"Thanks for sharing your mood! Your avatar will reflect this: {mood}")
        return []

class ActionSetGoal(Action):
    def name(self) -> str:
        return "action_set_goal"

    async def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: dict) -> list:
        # Extract the goal from user input (assume goal is in the user message)
        goal = tracker.latest_message['text']
        
        # Save the goal in the Django database
        await sync_to_async(Goal.objects.create)(goal_name=goal)
        
        # Notify user about goal setting
        dispatcher.utter_message(text=f"Your goal '{goal}' has been set!")
        return []

class ActionCheerUp(Action):
    def name(self):
        return "action_cheer_up"

    async def run(self, dispatcher, tracker, domain):
        quotes = [
            "Here is something to cheer you up 😊",
            "You're doing great! 🌟",
            "Keep going, you're stronger than you think 💪",
            "Every storm runs out of rain ☔",
            "Take a deep breath. You've got this 🧘",
        ]

        images = [
            "https://images.unsplash.com/photo-1518717758536-85ae29035b6d",  # Dog
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb",  # Forest
            "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",  # Sky
            "https://images.unsplash.com/photo-1485217988980-11786ced9454",  # Coffee
            "https://images.unsplash.com/photo-1504198453319-5ce911bafcde",  # Cat
        ]

        random_quote = random.choice(quotes)
        random_image = random.choice(images)

        dispatcher.utter_message(text=random_quote)
        dispatcher.utter_message(image=random_image)
        return []
