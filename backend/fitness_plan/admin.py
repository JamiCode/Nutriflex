from django.contrib import admin
from .models import Task
from .models import WorkoutPlan
from .models import FitnessProfile
from .models import NutritionMeal
# Register your models here.


admin.site.register(Task)
admin.site.register(WorkoutPlan)
admin.site.register(FitnessProfile)
admin.site.register(NutritionMeal)