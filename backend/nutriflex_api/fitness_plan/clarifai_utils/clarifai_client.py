from clarifai_grpc.channel.clarifai_channel import ClarifaiChannel
from clarifai_grpc.grpc.api import service_pb2, service_pb2_grpc, resources_pb2
from clarifai_grpc.grpc.api.status import status_code_pb2
from dotenv import load_dotenv
import os
import json

load_dotenv()


def setup_clarifai_api():
    PAT = os.getenv('PAT')
    USER_ID = os.getenv('USER_ID')
    APP_ID = os.getenv('APP_ID')

    channel = ClarifaiChannel.get_grpc_channel()
    stub = service_pb2_grpc.V2Stub(channel)

    metadata = (('authorization', 'Key ' + PAT),)
    userDataObject = resources_pb2.UserAppIDSet(user_id=USER_ID, app_id=APP_ID)

    return stub, metadata, userDataObject


def get_instructions(type_):
    """
    Reads and returns the content of 'gpt_create_instructions.txt'.

    Returns:
    - str: The content of the 'gpt_create_instructions.txt' file.
    """

    try:
        with open(f'gpt_{type_}_instructions.txt', 'r') as file:
            return file.read()
    except FileNotFoundError as er:
        print(er)
        print("Error: 'gpt_create_instructions.txt' file not found.")
        return None
    except Exception as e:
        print(f"An error occurred while reading the file: {e}")
        return None


def build_instruction_set(type_, user_data, previous_tasks=None, week_report=None):
    """
    Builds the instruction set for the GPT model.

    Args:
    - type_ (str): The type of instruction set to build. Can be either 'create' or 'update'.

    Returns:
    - str: The instruction set.
    """
    if type_ == "create":
        return get_instructions('create') + '\nUser data: ' + str(user_data)
    if type_ == "update":
        return (get_instructions('create') + '\nUser data: ' + str(user_data) + '\nPrevious Tasks:' +
                str(previous_tasks) + '\nLast week report: ' + str(week_report) + '\n' + get_instructions('update'))
    else:
        return None


def get_model_outputs(model_id, model_version_id, raw_text):
    stub, metadata, userDataObject = setup_clarifai_api()

    post_model_outputs_response = stub.PostModelOutputs(
        service_pb2.PostModelOutputsRequest(
            user_app_id=userDataObject,
            model_id=model_id,
            version_id=model_version_id,
            inputs=[
                resources_pb2.Input(
                    data=resources_pb2.Data(
                        text=resources_pb2.Text(
                            raw=raw_text
                        )
                    )
                )
            ]
        ),
        metadata=metadata
    )

    if post_model_outputs_response.status.code != status_code_pb2.SUCCESS:
        print(post_model_outputs_response.status)
        raise Exception(f"Post model outputs failed, status: {post_model_outputs_response.status.description}")

    return post_model_outputs_response.outputs[0]


def process_user_input(raw_text):
    model_id = 'gpt-4-turbo'
    model_version_id = '182136408b4b4002a920fd500839f2c8'
    return get_model_outputs(model_id, model_version_id, raw_text).data.text.raw


def format_output(output):
    try:
        output_dict = json.loads(output.replace('```', '').replace('json', ''))
        return output_dict
    except json.JSONDecodeError as e:
        # Handle the exception if the string is not valid JSON
        print(f"Error decoding JSON: {e}")
        return None


def create_new_tasks(user_data):
    """
    Creates new tasks based on the user's data.

    Args:
    - user_data (dict): The user's data.

    Returns:
    - list: A list of tasks.
    """
    model_id = 'gpt-4-turbo'
    model_version_id = '182136408b4b4002a920fd500839f2c8'
    instruction_set = build_instruction_set('create', user_data)

    return format_output(get_model_outputs(model_id, model_version_id, instruction_set).data.text.raw)


def update_tasks(user_data, previous_tasks, week_report):
    """
    Updates the user's tasks based on the week report.

    Args:
    - user_data (dict): The user's data.
    - week_report (dict): The week report.

    Returns:
    - list: A list of tasks.
    """
    model_id = 'gpt-4-turbo'
    model_version_id = '182136408b4b4002a920fd500839f2c8'
    instruction_set = build_instruction_set('update', previous_tasks, user_data, week_report)

    return format_output(get_model_outputs(model_id, model_version_id, instruction_set).data.text.raw)
