from clarifai_client import create_new_tasks, update_tasks, build_instruction_set
import json

if __name__ == '__main__':
    user_data = {'age': 25, 'weight': 40, 'height': 190, "goals": ["become a professional bodybuilder", "gain muscle"]}
    #print(build_instruction_set('create', user_data))
    previous_tasks = create_new_tasks(user_data)['tasks']
    #print(json.dumps(tasks, indent=4))

    week_report = {
        'completed_tasks': '3/7',
        'comment': "It was too hard and I'm too sore."
    }

    # print(build_instruction_set('update', user_data, previous_tasks, week_report))
    updated_tasks = update_tasks(user_data, previous_tasks, week_report)
    print(json.dumps(updated_tasks, indent=4))
