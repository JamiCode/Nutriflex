import axios_ from "@/api/axios";
import AuthenticatedNavBar from "@/components/AuthenticatedNavBar";
import Loader from "@/components/FadeOutLoader";
import TaskDisplayer from "@/components/TaskDisplayer";
import TasksContext, { TasksProvider } from "@/components/TasksProvider";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";

const WorkOutDashBoard = () => {
  const router = useRouter();
  const { workout_id } = router.query;
  const [workout_idState] = useState(workout_id);
  const [user, setUser] = useState({});

  const { globalTasks, setGlobalTasks } = useContext(TasksContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataResponse = await axios_("/api/users/me");
        setUser(userDataResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [globalTasks]);

  return (
    <div className="bg-gray-800 text-white min-h-screen font-sans flex">
      <div className="flex-1 items-center">
        <AuthenticatedNavBar
          userFirstName={user.first_name}
          userLastName={user.last_name}
        />
        <h1 className="text-3xl font-semibold text-white text-center mt-8">
          Weekly Task Manager
        </h1>

        <div
          className="flex flex-col p-6 bg-gray-800 rounded-lg shadow-lg mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 w-full lg:w-2/3 xl:w-2/3 min-h-[300px]"
          style={{
            backgroundColor: "#0d1a2e",
            margin: "auto",
            marginTop: 30,
            padding: "20px", // Add padding here
          }}
        >
          <TaskDisplayer workout_id={workout_id} />
        </div>
      </div>
    </div>
  );
};

export default WorkOutDashBoard;
