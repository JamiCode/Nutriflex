# account/serializers.py
from rest_framework import serializers
from .models import WorkoutPlan, Task, FitnessProfile
from django.contrib.auth.models import User
from account.models import Account

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['description', 'date', 'ongoing']

class WorkoutPlanSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True)

    class Meta:
        model = WorkoutPlan
        fields = ['description', 'tasks', 'is_completed', 'end_date']

class FitnessProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = FitnessProfile
        fields = [
            'user', 'height', 'weight',  'age', 'goals', 'activity_level',
            'smoking_habit', 'dietary_preference', 'duration'
        ]

    def create(self, validated_data):
        print(validated_data)
        fitness_plan = FitnessProfile.objects.create( **validated_data)
        print("All good")
        return fitness_plan
    
