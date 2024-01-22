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
import Loader from "@/components/FadeOutLoader";

const Dashboard = () => {
  // const { user, setAuth, setUser } = useContext(AuthContext);
  const [requestLoading, setRequestLoading] = useState(true); // Updated state name

  const [selectedTab, setSelectedTab] = useState("workout");
  const router = useRouter();
  const [hasWorkout, setHasWorkout] = useState(false);
  const [isFormMounted, setIsFormMounted] = useState(false);
  const [user, setUser] = useState({});
  const [workoutPlanState, setWorkOutPlanState] = useState({ name: "Loading" });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataResponse = await axios_.get("/api/users/me");
        setUser(userDataResponse.data);
        console.log(userDataResponse);
        const workoutResponse = await axios_.get(
          `/api/workout-plan/${userDataResponse.data.id}`
        ); //
        const nutritionDataResponse = await axios_.get(
          "/api/workout-plan/nutrition"
        );
        if (workoutResponse.status >= 200) {
          setHasWorkout(true);
          setWorkOutPlanState({
            workout_id: workoutResponse.data.id,
            name: workoutResponse.data.name,
            description: workoutResponse.data.description,
            is_completed: workoutResponse.data.is_completed,
            nutrition_meals: nutritionDataResponse.data,
          });
        }
        setRequestLoading(false); // Set requestLoading to false after all requests are completed
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
        setRequestLoading(false);
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
  const handleRenderDashBoardMessage = () => {
    if (!hasWorkout) {
      return (
        <p className="text-lg font-medium">
          Welcome {user.first_name}, Create a new workout plan to get started
        </p>
      );
    } else {
      return (
        <p className="text-lg font-medium">
          Greetings, {user.first_name}. Your personalized workout plan is ready.
          Please click on the workout plan to view your exercises.
        </p>
      );
    }
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen font-sans flex">
      <div className="flex-1 items-center">
        <AuthenticatedNavBar
          userFirstName={user.first_name}
          userLastName={user.last_name}
        />

        {requestLoading ? (
          <Loader />
        ) : (
          <div>
            <div className="bg-gray-700 text-white p-4 mb-6 ml-5 rounded-md mt-4 w-1/2">
              {handleRenderDashBoardMessage()}
            </div>

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
                          setTimeout(() => {
                            window.location.pathname = "/dashboard";
                          }, 4000);
                        }}
                        showModal={showModal}
                        yesOrNo={true}
                      />
                      <ToastContainer />
                    </div>
                  ) : isFormMounted ? (
                    <div>
                      <WorkoutFormProvider>
                        <WorkoutFormManager user={user} />
                      </WorkoutFormProvider>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-2xl font-bold mb-4 text-white">
                        You currently do not have any workout plan. Create one
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
                        ? "No nutrition plan avaliable, create a workout plan to generate a nutrition plan"
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
        )}
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
