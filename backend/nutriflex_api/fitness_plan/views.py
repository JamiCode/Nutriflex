from django.shortcuts import render

# Create your views here.
# account/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import FitnessProfile, WorkoutPlan
from .serializers import WorkoutPlanSerializer

from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from .models import FitnessProfile, WorkoutPlan, Task
from .serializers import FitnessProfileSerializer, WorkoutPlanSerializer, TaskSerializer


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


class FitnessProfileCreateAPIView(APIView):
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
                {'details':fitness_plan_serializer.data, 'object':['Mock Data workout plan']}, 
                status=status.HTTP_201_CREATED
            )

        return Response({'details':fitness_plan_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)