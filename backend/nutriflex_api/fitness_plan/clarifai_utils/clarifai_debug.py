from clarifai_client import create_new_tasks, update_tasks, build_instruction_set
import json
import time

if __name__ == '__main__':
    user_data = {
        'age': 25,
        'weight': 20,
        'height': 190,
        'bmi':33.24,
        'goals': ["Cardiovascular Fitness"],
        'activity_level': "Moderately Active",
        'smoking_habit': "Non-Smoker",
        'dietary_preference': "Omnivore"
    }
    print(build_instruction_set('create', user_data))
    print("-------------------------------------")
    print('check')

    print("creating new tasks")
    print("-------------------------------------")
    tasks = create_new_tasks(user_data)['tasks']
    print(json.dumps(tasks, indent=4))


    time.sleep(20)
    week_report = {
        'completed_tasks': '7/7',
        'week_weight_change': '+1kg',
        'month_weight_change': '+3kg',
        'comment': "I had trouble keeping up with tasks last week because I was really stressed out from work"
    }

    # print(build_instruction_set('update', user_data, previous_tasks, week_report))
    updated_tasks = update_tasks(user_data, tasks, week_report)
    print(json.dumps(updated_tasks, indent=4))
