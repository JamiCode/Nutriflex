import React, { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "@/components/AuthProvider";
import axios_ from "@/api/axios";
import { useRouter } from "next/router";
import "../../app/globals.css";
import AuthenticatedNavBar from "@/components/AuthenticatedNavBar";
import WorkoutFormManager from "@/components/WorkoutInputForm";
import { WorkoutFormProvider } from "@/components/WorkoutFormProvider";
import WorkoutPlanCard from "@/components/WorkoutPlanCard";
import ThreeContainersComponent from "@/components/ThreeContainersComponent";
import { Head } from "next/document";
import GeneralModal from "@/components/GeneralModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  // const { user, setAuth, setUser } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState("workout");
  const router = useRouter();
  const [hasWorkout, setHasWorkout] = useState(true);
  const [isFormMounted, setIsFormMounted] = useState(false);
  const [user, setUser] = useState({});
  const [workoutPlanState, setWorkOutPlanState] = useState({ name: "Loading" });
  const [showModal, setShowModal] = useState(false);

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

    const fetchUserWorkOutPlanData = async () => {
      try {
        const workoutPlanDataResponse = await axios_.get(
          "/api/workout-plans/view"
        );
        const nutritionDataResponse = await axios_.get(
          "/api/workout-plan/nutrition"
        );

        const workoutPlanData = workoutPlanDataResponse.data.data[0];
        setWorkOutPlanState({
          workout_id: workoutPlanData.id,
          name: workoutPlanData.name,
          description: workoutPlanData.description,
          is_completed: workoutPlanData.is_completed,
          nutrition_meals: nutritionDataResponse.data,
        });
      } catch (error) {}
    };
    fetchUserData();
    if (hasWorkout) {
      fetchUserWorkOutPlanData();
    }
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
  const deleteWorkoutPlan = async () => {
    try {
      const response = await axios_.delete("/api/workout-plan/delete", {
        withCredentials: true,
      });
      setHasWorkout(false);
    } catch (error) {
      console.log(error);
    }
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
                label="Workout Plan"
                selected={selectedTab === "workout"}
              />
            </div>
            <div className="border-r border-black border-opacity-75 h-8"></div>
            <div
              className={`group flex items-center px-4 py-2 bg-blue-gray-800 border border-black border-solid border-opacity-75 rounded-lg ${
                selectedTab === "nutrition"
                  ? "bg-opacity-100"
                  : "hover:bg-opacity-100"
              }`}
              onClick={() => changeTab("nutrition")}
            >
              <TabButton
                label="Nutrition Plan"
                selected={selectedTab === "nutrition"}
              />
            </div>
          </div>

          {/* Render content based on selected tab */}
          {selectedTab === "workout" && (
            <div>
              {hasWorkout ? (
                <div className="mb-8">
                  <h1 className="text-2xl font-bold mb-4 text-white">
                    Your Workout Plan
                  </h1>
                  <WorkoutPlanCard
                    title={workoutPlanState.name}
                    description={workoutPlanState.description}
                    onClick={() =>
                      router.push(`/workout/${workoutPlanState.workout_id}`)
                    }
                  />
                  <button
                    className="bg-red-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md"
                    onClick={() => setShowModal(true)}
                  >
                    Delete
                  </button>
                  <GeneralModal
                    title="Delete Workout Plan Action"
                    message="Are you sure you want to delete your workout plan?"
                    onCancel={() => setShowModal(false)}
                    onConfirm={() => {
                      setShowModal(false);
                      deleteWorkoutPlan();
                      toast("Your WorkoutPlan has been deleted");
                    }}
                    showModal={showModal}
                    yesOrNo={true}
                  />
                  <ToastContainer />
                </div>
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
                    You Do Not Have Any Workout Plan
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
          {selectedTab === "nutrition" && (
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-4 text-white">
                <h1 className="text-2xl font-bold mb-4 text-white">
                  {!hasWorkout
                    ? "You Do Not Have a Nutrition Plan"
                    : "Your Nutrition Plan"}
                </h1>
              </h1>
              <ThreeContainersComponent
                nutrition_meals={workoutPlanState.nutrition_meals}
              />
            </div>
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
