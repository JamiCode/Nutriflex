from django.contrib import admin
from .models import Task
from .models import WorkoutPlan
from .models import FitnessProfile
# Register your models here.


admin.site.register(Task)
admin.site.register(WorkoutPlan)
admin.site.register(FitnessProfile)
