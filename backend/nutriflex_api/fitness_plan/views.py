from django.shortcuts import render

# Create your views here.
# account/views.py
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, ListCreateAPIView
from django.shortcuts import get_object_or_404
from django.shortcuts import get_object_or_404
from .models import FitnessProfile, WorkoutPlan, Task
from .serializers import FitnessProfileSerializer, WorkoutPlanSerializer, TaskSerializer
from .models import FitnessProfile, NutritionMeal, WorkoutPlan
from .serializers import NutritionMealSerializer, WorkoutPlanSerializer
from .services import update_tasks_
from .services import get_recently_issued_nutrition_meals_as_dict,get_tasks_for_fitness_profile



class HomeView(APIView):
    def get(self, request, *args, **kwargs):
        return Response({"message":"Welcome to nutriflexapi"})

class UserWorkoutPlanView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        user_id = self.kwargs.get('user_id')
        
        # Get the fitness plans for the user
        fitness_plans = FitnessProfile.objects.filter(user_id=user_id)

        # Check if any fitness plans exist
        if fitness_plans.exists():
            fitness_plan = fitness_plans.first()

            # Check if the user has any workout plan
            if fitness_plan.workout_plan:
                workout_plan_serializer = WorkoutPlanSerializer(fitness_plan.workout_plan)
                return Response(workout_plan_serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "User has fitness profile but no workoutplan dispatched by AI", "object": ["coming soon"]}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"detail": "User does not have any fitness coming", "object": []}, status=status.HTTP_404_NOT_FOUND)


class WorkoutPlanCreateAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        # You may want to add authentication and permission checks here
        fitness_plan_data = request.data
        workout_plan_data = fitness_plan_data.pop('workout_plan', None)

        fitness_plan_serializer = FitnessProfileSerializer(data=fitness_plan_data)
        if fitness_plan_serializer.is_valid():
            fitness_plan_instance = fitness_plan_serializer.save()
            return Response(
                {'details':"Workout Plan Created Successfully ", 'object':[1], "api_status":True}, 
                status=status.HTTP_201_CREATED
            )

        return Response({'details':fitness_plan_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class WorkOutPlanListView(APIView):
    serializer_class = WorkoutPlanSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        #Retrieve workoutplans for the authenticated user
        try:
            user = self.request.user
            fitness_profile = FitnessProfile.objects.filter(user=user)[0]
            workout_plans = WorkoutPlan.objects.filter(fitnessprofile=fitness_profile)
            if  not workout_plans:
                Response({"data":[]}, status=status.HTTP_200_OK)
                return
            serializer = self.serializer_class(workout_plans, many=True)
            return Response({"data":serializer.data}, status=status.HTTP_200_OK)
        except IndexError:
            return Response({"data":[]})

class TaskListView(ListAPIView):
    """" Endpoints sends a list of tasks that arent completed and arent skiped"""
    serializer_class = TaskSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        workoutplan_id = self.kwargs.get('workoutplan_id')
        workout_plan = WorkoutPlan.objects.get(pk=workoutplan_id)
        
        # Filter tasks where is_done is False
        tasks = workout_plan.tasks.filter(is_done=False, skipped=False)
        
        return tasks
    
class SetTaskCompleted(APIView):
    serializer_class = TaskSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        task_id = self.kwargs.get('task_id')

        task_obj = get_object_or_404(Task, id=task_id)

        task_obj.is_done = True

        task_obj.save()

        return Response({'data': 'Changed resource successfully'})

class SetTaskSkipped(APIView):
    serializer_class = TaskSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]


    def get(self, request, *args, **kwargs):
        task_id = self.kwargs.get('task_id')
        tasks_obj = get_object_or_404(Task, id=task_id)
        tasks_obj.skipped = True
        tasks_obj.is_done = False
        tasks_obj.save()
        return Response({'data':'Changed resource successfully'})
    
class TaskListViewCompleted(ListAPIView):
    """ Endpoint used to send a list of completed tasks"""
    serializer_class = TaskSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        workoutplan_id = self.kwargs.get('workoutplan_id')
        workout_plan = WorkoutPlan.objects.get(pk=workoutplan_id)
        
        # Filter tasks where is_done is False
        tasks = workout_plan.tasks.filter(is_done=True)
        
        return tasks

class NutritionMealViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = NutritionMeal.objects.all()
    serializer_class = NutritionMealSerializer

class UpdateTasksView(ListCreateAPIView):
    """ This endpoint updates task to the database """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
     
        try:
            user = request.user
            workout_plan_id = kwargs.get('workout_plan_id')
            workout_plan = get_object_or_404(WorkoutPlan, id=workout_plan_id)

            fitness_profile = FitnessProfile.objects.get(user=user)
            user_fitness_data  = {
                'age': fitness_profile.age,
                'weight': fitness_profile.weight,
                'height': fitness_profile.height,
                'bmi': fitness_profile.bmi,
                'goals': [fitness_profile.goals],
                'activity_level': fitness_profile.activity_level,
                'smoking_habit': fitness_profile.smoking_habit,
                'dietary_preference': fitness_profile.dietary_preference
            }
            previous_nutrition = get_recently_issued_nutrition_meals_as_dict(fitness_profile)
            previous_tasks = get_tasks_for_fitness_profile(fitness_profile)
            report = request.data
            bot_data = update_tasks_(user_data=user_fitness_data, nutrition=previous_nutrition, previous_tasks=previous_tasks, report=report )
            bot_tasks =  bot_data[-1]
            bot_nutrition = bot_data[0]
            bot_comment = bot_data[-2]
            tasks = [Task.objects.create(**task_data) for task_data in bot_tasks]

            nutrition_meals = [NutritionMeal.objects.create(**nutrition_data) for nutrition_data in bot_nutrition ]
            workout_plan.tasks.set(tasks)
            workout_plan.nutrition_meals.set(nutrition_meals)

            return Response({"detail": "Success", "comment":bot_comment}, status=status.HTTP_201_CREATED)


        except FitnessProfile.DoesNotExist:
            # Handle the case where FitnessProfile does not exist for the user
            error_message = "FitnessProfile does not exist for the user."
            return Response({"detail": error_message}, status=status.HTTP_400_BAD_REQUEST)