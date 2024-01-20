from clarifai_client import create_new_tasks, update_tasks, build_instruction_set
import json
import time

if __name__ == '__main__':
    user_data = {
        'age': 25,
        'weight': 20,
        'height': 190,
        'bmi': 33.24,
        'goals': ["Gain weight while also increasing mobility, dexterity and flexibility"],
        'activity_level': "Moderately Active",
        'smoking_habit': "Non-Smoker",
        'dietary_preference': "Vegan"
    }
    print(build_instruction_set('create', user_data))
    print("-------------------------------------")
    print('check')

    print("creating new tasks")
    print("-------------------------------------")
    output = create_new_tasks(user_data)
    # print(json.dumps(output, indent=4))
    name = output['name']
    nutrition = output['nutrition']
    tasks = output['tasks']
    overview = output['overview']

    time.sleep(20)
    week_report = {
        'completed_tasks': '7/7',
        'week_weight_change': '-20kg',
        'comment': "I felt very weak with the nutrition recommended last week"
    }

    # print(build_instruction_set('update', user_data, nutrition, tasks, week_report))
    updated_tasks = update_tasks(user_data, nutrition, tasks, week_report)
    print(json.dumps(updated_tasks, indent=4))
