# account/serializers.py
from datetime import datetime, timedelta
from django.utils import timezone
from .clarifai_utils.clarifai_client import create_new_tasks
from .clarifai_utils.clarifai_client import update_tasks
from datetime import date
from .models import NutritionMeal, WorkoutPlan
import json

def generate_next_seven_days():
    today = timezone.now().date() # today's date
    next_seven_days = [today + timedelta(days=i) for i in range(7)]
    return next_seven_days


def create_new_tasks_(validated_data) -> tuple:
    bot_response = create_new_tasks(validated_data) 
    name = bot_response['name']
    tasks = bot_response["tasks"]
    nutrition_unserialized = bot_response["nutrition"]
    overview = bot_response['overview']


    nutrition_list = []

    for nutrition_meal in nutrition_unserialized.values():
        nutrition_list.append(nutrition_meal)

    seven_days = generate_next_seven_days()
    # Add 'day_to_be_done' key to each dictionary in tasks_list
    for index, task in enumerate(tasks):
        task['day_to_be_done'] = seven_days[index] 
    #return a tuple in the order of (name, nutrition_plan, overview task_list)
    return (name, nutrition_list, overview, tasks)

def update_tasks_(
    user_data:dict,
    nutrition:dict, 
    previous_tasks:list, 
    report:dict
    )-> tuple: 
    bot_response = update_tasks( 
        user_data,
        nutrition,
        previous_tasks,
        report
    )
    print(json.dumps(bot_response, indent=4))
    tasks = bot_response["tasks"]
    nutrition_unserialized = bot_response["nutrition"]
    overview_comment = bot_response['overview']

    nutrition_list = []

    for nutrition_meal in nutrition_unserialized.values():
        nutrition_list.append(nutrition_meal)

    seven_days = generate_next_seven_days()
    # Add 'day_to_be_done' key to each dictionary in tasks_list
    for index, task in enumerate(tasks):
        task['day_to_be_done'] = seven_days[index] 

    return (nutrition_list, overview_comment, tasks)


def get_recently_issued_nutrition_meals_as_dict(fitness_profile):
    recently_issued_meals_dict = {}

    try:
        # Retrieve the workout plan associated with the fitness profile
        workout_plan = fitness_profile.workout_plan

        # Check if the workout plan is completed
        if workout_plan and not workout_plan.is_completed:
            # Filter nutrition meals that are recently issued and associated with the workout plan
            recently_issued_meals = NutritionMeal.objects.filter(
                recently_issued=True,
                workoutplan__id=workout_plan.id
            )

            # Convert the queryset to a dictionary
            recently_issued_meals_dict = {
                f"meal{i + 1}": meal.calories for i, meal in enumerate(recently_issued_meals)
            }

            # Update recently_issued to False for the retrieved NutritionMeal objects
            recently_issued_meals.update(recently_issued=False)
           
            # Save each instance separately
            for meal in recently_issued_meals:
                meal.save()

    except WorkoutPlan.DoesNotExist:
        # Handle the case when there is no workout plan associated with the fitness profile
        pass

    return recently_issued_meals_dict


def get_tasks_for_fitness_profile(fitness_profile):
    tasks_data = []

    # Check if the fitness profile has a workout plan
    if fitness_profile.workout_plan:
        workout_plan = fitness_profile.workout_plan

        # Retrieve tasks associated with the workout plan
        tasks = workout_plan.tasks.all()

        # Build a list of dictionaries representing the tasks
        for task in tasks:
            task_data = {
                'id': str(task.id),
                'description': task.description,
                'is_done': task.is_done,
                'skipped': task.skipped,
                'duration': task.duration,
            }
            tasks_data.append(task_data)

    return tasks_data
