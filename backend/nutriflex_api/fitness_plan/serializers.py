# account/serializers.py
from rest_framework import serializers
from datetime import datetime, timedelta
from django.contrib.auth.models import User
from django.utils import timezone
from account.models import Account
from .models import WorkoutPlan, Task, FitnessProfile, NutritionMeal
from .services import create_new_tasks_




class NutritionMealSerializer(serializers.ModelSerializer):
    class Meta:
        model = NutritionMeal
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"


class WorkoutPlanSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True)

    class Meta:
        model = WorkoutPlan
        fields = "__all__"


class FitnessProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = FitnessProfile
        fields = [
            'user', 'height', 'weight',  'age', 'goals', 'activity_level',
            'smoking_habit', 'dietary_preference'
        ]

    def create(self, validated_data):

        user = validated_data.get('user')


        #  Bot creates user task
        bot_data = create_new_tasks_(validated_data)
        tasks_list  = bot_data[-1]
        workout_plan_name = bot_data[0]
        overview = bot_data[-2]
        nutrition_list = bot_data[1]

        
        workout_plan_obj = WorkoutPlan.objects.create(
            name=workout_plan_name,
            description=overview,
            is_completed=False, 
            fitness_profile_name=f"{user.first_name} {user.last_name}"
            )   
        tasks = [Task.objects.create(**task_data) for task_data in tasks_list]
        nutrition_meals = [NutritionMeal.objects.create(**nutrition_data) for nutrition_data in nutrition_list ]
        workout_plan_obj.tasks.set(tasks)
        workout_plan_obj.nutrition_meals.set(nutrition_meals)
        
        fitness_profile_obj = FitnessProfile.objects.create(workout_plan=workout_plan_obj, **validated_data)

        return fitness_profile_obj
    
