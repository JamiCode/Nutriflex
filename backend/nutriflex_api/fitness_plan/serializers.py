# account/serializers.py
from rest_framework import serializers
from datetime import datetime, timedelta
from django.contrib.auth.models import User
from django.utils import timezone
from account.models import Account
from .models import WorkoutPlan, Task, FitnessProfile
from .services import create_new_tasks_



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

        user = validated_data.get('user')


        #  Bot creates user task
        task_data_list = [
            {'description': 'Task 1', 'is_done': False, 'duration': '30 mins', 'day_to_be_done': '2024-01-20'},
            {'description': 'Task 2', 'is_done': False, 'duration': '45 mins', 'day_to_be_done': '2024-01-21'},
            {'description': 'Task 3', 'is_done': False, 'duration': '60 mins', 'day_to_be_done': '2024-01-22'},
        ]

        tasks_list = create_new_tasks_(validated_data)
        workout_plan_obj = WorkoutPlan.objects.create(description="Sample Workout Plan", is_completed=False, fitness_profile_name=f"{user.first_name} {user.last_name}")
        tasks = [Task.objects.create(**task_data) for task_data in tasks_list]
        workout_plan_obj.tasks.set(tasks)


        fitness_profile_obj = FitnessProfile.objects.create(workout_plan=workout_plan_obj, **validated_data)

        print("All good")
        return fitness_profile_obj
    
