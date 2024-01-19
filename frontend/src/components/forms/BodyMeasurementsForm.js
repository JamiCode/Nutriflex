import React, { useState, useEffect, useContext } from "react";
import WorkoutFormContext from "../WorkoutFormProvider";

const BodyMeasurementsForm = () => {
  const { globalFormState, setGlobalFormState } =
    useContext(WorkoutFormContext);
  // Initialize state with specific values
  const [formData, setFormData] = useState({
    height:globalFormState.height, 
    weight: globalFormState.weight, 
    age: globalFormState.age,
  });

  // Handle input changes and update the state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setGlobalFormState((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form>
      {/* Height input field */}
      <div className="mb-4">
        <label
          htmlFor="height"
          className="block text-sm font-medium text-white"
        >
          Height (cm)
        </label>
        <input
          type="text"
          name="height"
          id="height"
          onChange={handleChange}
          value={formData.height}
          className="mt-1 p-2 w-full border rounded bg-gray-700 text-white"
        />
        <p className="text-sm text-gray-300 italic mt-1">
          Enter your exact Height
        </p>
      </div>

      {/* Weight input field */}
      <div className="mb-4">
        <label
          htmlFor="weight"
          className="block text-sm font-medium text-white"
        >
          Weight (kg)
        </label>
        <input
          type="text"
          name="weight"
          id="weight"
          onChange={handleChange}
          value={formData.weight}
          className="mt-1 p-2 w-full border rounded bg-gray-700 text-white"
        />
        <p className="text-sm text-gray-300 italic mt-1">
          Enter your exact Weight
        </p>
      </div>

      {/* Age input field */}
      <div className="mb-4">
        <label htmlFor="age" className="block text-sm font-medium text-white">
          Age
        </label>
        <input
          type="text"
          name="age"
          id="age"
          onChange={handleChange}
          value={formData.age}
          className="mt-1 p-2 w-full border rounded bg-gray-700 text-white"
        />
        <p className="text-sm text-gray-300 italic mt-1">How old are you</p>
      </div>
    </form>
  );
};

export default BodyMeasurementsForm;
