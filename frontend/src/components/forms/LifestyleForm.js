import React, { useState, useContext } from "react";
import WorkoutFormContext from "../WorkoutFormProvider";
import AuthContext from "../AuthProvider";

const LifestyleForm = () => {
  const { globalFormState, setGlobalFormState } =
    useContext(WorkoutFormContext);
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    dietaryPreference: globalFormState.dietaryPreference,
    durationNumber: globalFormState.durationNumber,
    durationUnit: globalFormState.durationUnits, // Default unit is months
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
        <input
          type="text"
          name="smokingHabit"
          id="smokingHabit"
          onChange={handleChange}
          value={formData.smokingHabit}
          className="mt-1 p-2 w-full border rounded bg-gray-700 text-white"
        />
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
      </div>

      <div className="mb-4 flex space-x-4">
        <div>
          <label
            htmlFor="durationNumber"
            className="block text-sm font-medium text-white"
          >
            Duration Number
          </label>
          <select
            name="durationNumber"
            id="durationNumber"
            onChange={handleChange}
            value={formData.durationNumber}
            className="mt-1 p-2 w-full border rounded bg-gray-700 text-white"
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="durationUnit"
            className="block text-sm font-medium text-white"
          >
            Duration Unit
          </label>
          <select
            name="durationUnit"
            id="durationUnit"
            onChange={handleChange}
            value={formData.durationUnit}
            className="mt-1 p-2 w-full border rounded bg-gray-700 text-white"
          >
            <option value="months">Months</option>
            <option value="weeks">Weeks</option>
          </select>
        </div>
        <p onClick={() => console.log(globalFormState, user)}>k</p>
      </div>
    </form>
  );
};

export default LifestyleForm;
