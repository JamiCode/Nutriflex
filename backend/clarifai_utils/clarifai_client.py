# import required packages
from clarifai_grpc.channel.clarifai_channel import ClarifaiChannel
from clarifai_grpc.grpc.api import service_pb2, service_pb2_grpc, resources_pb2
from clarifai_grpc.grpc.api.status import status_code_pb2
from dotenv import load_dotenv
import os

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


def get_instructions():
    """
    Reads and returns the content of 'gpt_instructions.txt'.

    Returns:
    - str: The content of the 'gpt_instructions.txt' file.
    """

    try:
        with open('gpt_instructions.txt', 'r') as file:
            return file.read()
    except FileNotFoundError:
        print("Error: 'gpt_instructions.txt' file not found.")
        return None
    except Exception as e:
        print(f"An error occurred while reading the file: {e}")
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


if __name__ == '__main__':
    model_id = 'gpt-4-turbo'
    model_version_id = '182136408b4b4002a920fd500839f2c8'
    raw_text = get_instructions()

    output = get_model_outputs(model_id, model_version_id, raw_text)
    print(output.data.text.raw)
