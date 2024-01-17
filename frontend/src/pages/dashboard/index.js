import React, { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "@/components/AuthProvider";
import axios_ from "@/api/axios";
import { useRouter } from "next/router";
import "../../app/globals.css";
import AuthenticatedNavBar from "@/components/AuthenticatedNavBar";
import WorkoutFormManager from "@/components/WorkoutInputForm";
import { WorkoutFormProvider } from "@/components/WorkoutFormProvider";
const Dashboard = () => {
  // const { user, setAuth, setUser } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState("workout");
  const router = useRouter();
  const [hasWorkout, setHasWorkout] = useState(true);
  const [isFormMounted, setIsFormMounted] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataResponse = await axios_.get("/api/users/me");
        setUser(userDataResponse.data);
        const workoutResponse = await axios_.get(
          `/api/workout-plan/${userDataResponse.data.id}`
        ); //
        if (workoutResponse.response >= 200) {
          setHasWorkout(true);
        }
      } catch (error) {
        if (error.response) {
          // if the client error is caused by 404 error, meaning there is no workout
          if (
            error.response.status === 404 &&
            error.response.data.object &&
            error.response.data.object.length === 0
          ) {
            setHasWorkout(false);
          }
        }
      }
    };
    fetchUserData();
  }, []);

  const handleWorkoutFormSubmit = async (formData) => {
    console.log("Workout Form Data:", formData);
  };

  const changeTab = (tab) => {
    setSelectedTab(tab);
  };

  const handleStartPlanClick = () => {
    setIsFormMounted(true);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-800 text-white min-h-screen font-sans flex">
      <div className="flex-1 items-center">
        <AuthenticatedNavBar
          userFirstName={user.first_name}
          userLastName={user.last_name}
        />
        <h2>
          {" "}
          Hello {user.first_name}, {user.last_name}, {user.id}
        </h2>
        <div
          className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 w-full lg:w-2/3 xl:w-2/3 min-h-[300px]"
          style={{
            backgroundColor: "#0d1a2e",
            margin: "auto",
            marginTop: 30,
          }}
        >
          <div className="flex space-x-4 mb-4">
            <div
              className={`group flex items-center px-4 py-2 bg-blue-gray-800 border border-black border-solid border-opacity-75 rounded-lg ${
                selectedTab === "workout"
                  ? "bg-opacity-100"
                  : "hover:bg-opacity-50"
              }`}
              onClick={() => changeTab("workout")}
            >
              <TabButton
                label="Workout Plans"
                selected={selectedTab === "workout"}
              />
            </div>
            <div className="border-r border-black border-opacity-75 h-8"></div>
            <div
              className={`group flex items-center px-4 py-2 bg-blue-gray-800 border border-black border-solid border-opacity-75 rounded-lg ${
                selectedTab === "progress"
                  ? "bg-opacity-100"
                  : "hover:bg-opacity-100"
              }`}
              onClick={() => changeTab("progress")}
            >
              <TabButton
                label="Progress Report"
                selected={selectedTab === "progress"}
              />
            </div>
          </div>

          {/* Render content based on selected tab */}
          {selectedTab === "workout" && (
            <div>
              {hasWorkout ? (
                <p>Has Plan</p>
              ) : isFormMounted ? (
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white italic">
                    Input Prompts to the AI model to generate a personalized
                    workout plan
                  </h4>
                  <WorkoutFormProvider>
                    <WorkoutFormManager user={user} />
                  </WorkoutFormProvider>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-2xl font-bold mb-4 text-white">
                    No Workout Plans
                  </p>
                  <p className="text-gray-300 mb-4">
                    Click below to start a new plan
                  </p>
                  <button
                    onClick={handleStartPlanClick}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                  >
                    Start a New Plan
                  </button>
                </div>
              )}
            </div>
          )}
          <hr className="my-4 border-t-2 border-red-500" />
          {selectedTab === "nutrition" && (
            <p className="text-2xl font-bold mb-4">Nutrition Plans</p>
          )}
          {selectedTab === "progress" && (
            <p className="text-2xl font-bold mb-4">(Progress Report)</p>
          )}
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ label, selected, onClick }) => (
  <button
    className={`text-lg font-medium ${
      selected ? "text-blue-500" : "text-white hover:text-gray-300"
    } focus:outline-none`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default Dashboard;
