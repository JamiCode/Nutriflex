import React, { useState, useEffect, useContext } from "react";
import WorkoutFormContext from "../WorkoutFormProvider";

const GoalsActivityForm = () => {
  const { globalFormState, setGlobalFormState } =
    useContext(WorkoutFormContext);
  const [formData, setFormData] = useState({
    goals: globalFormState.goals,
    activityLevel:globalFormState.activityLevel,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setGlobalFormState((prevData) => ({ ...prevData, [name]: value }));

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ goalsActivity: formData });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="goals" className="block text-sm font-medium text-white">
          Goals
        </label>
        <textarea
          name="goals"
          id="goals"
          onChange={handleChange}
          value={formData.goals}
          className="mt-1 p-2 w-full border rounded bg-gray-700 text-white"
          rows="4" // Set the number of rows to allow multiline input
        />
        <p className="text-sm text-gray-300 italic mt-1">
          What specific fitness goals would you like to achieve? Examples:
          Sculpt well-defined leg muscles, shed 60 pounds, enhance overall
          endurance, or any specific target you have in mind. Providing detailed
          goals helps our AI tailor a more personalized workout plan for you.
        </p>
      </div>

      <div className="mb-4">
        <label
          htmlFor="activityLevel"
          className="block text-sm font-medium text-white"
        >
          Activity Level
        </label>
        <select
          name="activityLevel"
          id="activityLevel"
          onChange={handleChange}
          value={formData.activityLevel}
          className="mt-1 p-2 w-full border rounded bg-gray-700 text-white"
        >
          <option value="" disabled>
            Select Activity Level
          </option>
          <option value="sedentary">Sedentary (Little or no exercise)</option>
          <option value="lightlyActive">
            Lightly Active (Light exercise/sports 1-3 days/week)
          </option>
          <option value="moderatelyActive">
            Moderately Active (Moderate exercise/sports 3-5 days/week):
          </option>
          <option value="veryActive">
            Very Active (Hard exercise/sports 6-7 days a week):{" "}
          </option>
          <option value="ExtraActive">
            Extra Active (Very hard exercise/sports & physical job or 2x
            training)
          </option>
        </select>
      </div>
    </form>
  );
};

export default GoalsActivityForm;
