import axios_ from "@/api/axios";
import AuthenticatedNavBar from "@/components/AuthenticatedNavBar";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const WorkOutDashBoard = () => {
  const router = useRouter();
  const { workout_id } = router.query;
  const [workout_idState] = useState(workout_id);
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataResponse = await axios_("/api/users/me");
        setUser(userDataResponse.data);

        // Check if workout_id is available
        if (workout_id) {
          const tasksDataResponse = await axios_(
            `api/workout-plan/tasks/${workout_id}`
          );
          setTasks(tasksDataResponse.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [workout_id]); // Include workout_id as a dependency

  return (
    <div className="bg-gray-800 text-white min-h-screen font-sans flex">
      <div className="flex-1 items-center">
        <AuthenticatedNavBar
          userFirstName={user.first_name}
          userLastName={user.last_name}
        />

        {/* Display tasks */}
        <div
          className="flex flex-col p-6 bg-gray-800 rounded-lg shadow-lg mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 w-full lg:w-2/3 xl:w-2/3 min-h-[300px]"
          style={{
            backgroundColor: "#0d1a2e",
            margin: "auto",
            marginTop: 30,
            padding: "20px", // Add padding here
          }}
        >
          {/* Display tasks */}
          <div className="mt-8 overflow-y-auto" style={{ maxHeight: "400px" }}>
            <h2 className="text-2xl font-bold mb-4">Your Tasks </h2>
            <ul>
              {tasks.map((task) => (
                <li key={task.id} className="text-lg mb-4">
                  <div className="flex items-center">
                    {/* Paper-like component for each task */}
                    <div className="bg-gray-400 p-4 rounded-md flex-1">
                      {task.description}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkOutDashBoard;
