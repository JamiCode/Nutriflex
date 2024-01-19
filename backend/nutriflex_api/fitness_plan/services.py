# account/serializers.py
from datetime import datetime, timedelta
from django.utils import timezone
from .clarifai_utils.clarifai_client import create_new_tasks


def generate_next_seven_days():
    today = timezone.now().date() # today's date
    next_seven_days = [today + timedelta(days=i) for i in range(7)]
    return next_seven_days


def create_new_tasks_(validated_data):
    bot_response = create_new_tasks(validated_data) 
    name = bot_response['name']
    tasks = bot_response["tasks"]
    nutrition = bot_response["nutrition"]
    overview = bot_response['overview']

    seven_days = generate_next_seven_days()

    # Add 'day_to_be_done' key to each dictionary in tasks_list
    for index, task in enumerate(tasks):
        task['day_to_be_done'] = seven_days[index] 
    #return a tuple in the order of (name, nutrition_plan, overview task_list)
    return (name, nutrition, overview, tasks)
