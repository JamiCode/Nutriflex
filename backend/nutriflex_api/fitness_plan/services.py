# account/serializers.py
from datetime import datetime, timedelta
from django.utils import timezone
from .clarifai_utils.clarifai_client import create_new_tasks


def generate_next_seven_days():
    today = timezone.now().date() # today's date
    next_seven_days = [today + timedelta(days=i) for i in range(7)]
    return next_seven_days


def create_new_tasks_(validated_data):
    print(validated_data, "poop")
    tasks_list = create_new_tasks(validated_data)["tasks"]
    seven_days = generate_next_seven_days()

    # Add 'day_to_be_done' key to each dictionary in tasks_list
    for index, task in enumerate(tasks_list):
        task['day_to_be_done'] = seven_days[index] 
    return tasks_list
