import React, { useState, useContext } from "react";
import WorkoutFormContext from "../WorkoutFormProvider";
import AuthContext from "../AuthProvider";

const LifestyleForm = () => {
  const { globalFormState, setGlobalFormState } =
    useContext(WorkoutFormContext);
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    dietaryPreference: globalFormState.dietaryPreference,
    smokingHabit: globalFormState.smokingHabit, // Added smokingHabit to formData
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setGlobalFormState((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form>
      <div className="mb-4">
        <label
          htmlFor="smokingHabit"
          className="block text-sm font-medium text-white"
        >
          Smoking Habit
        </label>
        <select
          name="smokingHabit"
          id="smokingHabit"
          onChange={handleChange}
          value={formData.smokingHabit}
          className="mt-1 p-2 w-full border rounded bg-gray-700 text-white"
        >
          <option value="nonSmoker">Non-Smoker</option>
          <option value="occasionalSmoker">Occasional Smoker</option>
          <option value="regularSmoker">Regular Smoker</option>
          <option value="frequentSmoker">Frequent Smoker</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="dietaryPreference"
          className="block text-sm font-medium text-white"
        >
          Dietary Preference
        </label>
        <input
          type="text"
          name="dietaryPreference"
          id="dietaryPreference"
          onChange={handleChange}
          value={formData.dietaryPreference}
          className="mt-1 p-2 w-full border rounded bg-gray-700 text-white"
        />
        {/* Helper text */}
        <p className="text-sm text-gray-400 mt-2">
          Enter your dietary preference (e.g., vegetarian, vegan, nut-free).
          What you prefer in your diet.
        </p>
      </div>
    </form>
  );
};

export default LifestyleForm;
