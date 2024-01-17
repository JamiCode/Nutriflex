import axios from "@/api/axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const WorkoutFormContext = React.createContext({
  globalFormState: {
    height: "",
    weight: "",
    age: "",
    goals: "",
    activityLevel: "",
    smokingHabit: "",
    dietaryPreference: "",
    durationNumber: "",
    durationUnits: "",
  },
  setGlobalFormState: () => {},
});

export const WorkoutFormProvider = ({ children }) => {
  const [globalFormState, setGlobalFormState] = useState({
    height: "",
    weight: "",
    age: "",
    goals: "",
    activityLevel: "",
    smokingHabit: "",
    dietaryPreference: "",
    duration:''
  });
  const router = useRouter();

  const redirectToHome = () => {
    const allowedPaths = ["/", "/auth/register", "/auth/login"];

    if (!allowedPaths.includes(window.location.pathname)) {
      window.location.pathname = "/";
      router.push("/");
    }
  };

  return (
    <WorkoutFormContext.Provider
      value={{
        globalFormState,
        setGlobalFormState,
      }}
    >
      {children}
    </WorkoutFormContext.Provider>
  );
};

export default WorkoutFormContext;
