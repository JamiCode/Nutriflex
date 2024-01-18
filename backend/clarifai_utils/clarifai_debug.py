from clarifai_client import create_new_tasks, update_tasks, build_instruction_set
import json

if __name__ == '__main__':
    user_data = {'age': 25, 'weight': 120, 'height': 190, "goals": ["become a better sumo wrestler", "gain mass"]}
    #print(build_instruction_set('create', user_data))
    tasks = create_new_tasks(user_data)['tasks']
    #print(json.dumps(tasks, indent=4))

    week_report = {
        'completed_tasks': '7/7',
        'week_weight_change': '+1kg',
        'month_weight_change': '+3kg',
        'comment': "I had trouble keeping up with tasks last week because I was really stressed out from work"
    }

    # print(build_instruction_set('update', user_data, previous_tasks, week_report))
    updated_tasks = update_tasks(user_data, tasks, week_report)
    print(json.dumps(updated_tasks, indent=4))
