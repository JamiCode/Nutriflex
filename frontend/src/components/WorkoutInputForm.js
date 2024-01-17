import React, { useContext, useState } from "react";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import BodyMeasurementsForm from "./forms/BodyMeasurementsForm";
import GoalsActivityForm from "./forms/GoalsActivityForm";
import LifestyleForm from "./forms/LifestyleForm";
import WorkoutFormContext from "./WorkoutFormProvider";
import AuthContext from "./AuthProvider";
import axios_ from "@/api/axios";

const WorkoutFormManager = ({ user }) => {
  const { globalFormState, setGlobalFormState } =
    useContext(WorkoutFormContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerateWorkoutPlanLoading, setIsGenerateWorkoutPlanLoading] =
    useState(false);

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleGenerateWorkoutPlan = async () => {
    setIsGenerateWorkoutPlanLoading(true);
    const workoutPlanBody = {
      user: user.id,
      height: globalFormState.height,
      weight: globalFormState.weight,
      age: globalFormState.age,
      goals: globalFormState.goals,
      activity_level: globalFormState.activityLevel,
      smoking_habit: globalFormState.smokingHabit,
      dietary_preference: globalFormState.dietaryPreference,
      duration: `${globalFormState.durationNumber}${globalFormState.durationUnits}`,
    };
    try {
      const createWorkoutPlanResponse = await axios_.post(
        "/api/workout-plan/create/",
        workoutPlanBody,
        { withCredentials: true }
      );
      console.log(createWorkoutPlanResponse.data);
      setIsGenerateWorkoutPlanLoading(false);
      window.location.pathname = "/da";
    } catch (error) {
      console.log(error);
    }
  };

  const renderCurrentForm = () => {
    switch (currentStep) {
      case 1:
        return <BodyMeasurementsForm />;
      case 2:
        return <GoalsActivityForm />;
      case 3:
        return <LifestyleForm user={user} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 p-6 max-w-sm mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Create Your Workout Plan
      </h2>

      {renderCurrentForm()}

      <div className="mt-4 flex justify-between">
        {currentStep > 1 && (
          <button
            onClick={handlePrev}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Previous
          </button>
        )}
        {currentStep < 3 && (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
            type="submit"
            onClick={handleNext}
          >
            Next
          </button>
        )}
        {currentStep === 3 && (
          <button
            className={`${
              isGenerateWorkoutPlanLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            } text-white py-2 px-4 rounded-lg`}
            type="submit"
            onClick={handleGenerateWorkoutPlan}
            disabled={isGenerateWorkoutPlanLoading}
          >
            {isGenerateWorkoutPlanLoading ? (
              <ClipLoader
                color="#ffffff"
                loading={isGenerateWorkoutPlanLoading}
                size={20}
              />
            ) : (
              "Generate Workout Plan"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default WorkoutFormManager;
