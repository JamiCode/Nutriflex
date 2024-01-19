import React, { useContext, useEffect, useState } from "react";
import TasksContext from "./TasksProvider";
import axios_ from "@/api/axios";
axios_;

const TaskDisplayer = ({ workout_id }) => {
  const [selectedTab, setSelectedTab] = useState("today");
  const { globalTasks, setGlobalTasks } = useContext(TasksContext);
  const [localTasks, setLocalTasks] = useState([]);
  const changeTab = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    const fetchTaskData = async () => {
      if (workout_id) {
        console.log("Hit");
        const tasksDataResponse = await axios_(
          `api/workout-plan/tasks/${workout_id}`
        );
        console.log(tasksDataResponse.data);
        setGlobalTasks(tasksDataResponse.data);
        setLocalTasks(tasksDataResponse.data);
      }
    };
    fetchTaskData();
  }, [workout_id]);

  const handleFinishTask = () => {
    // Add logic here to handle finishing the task
    console.log("Task finished!");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center space-x-4">
        <div
          className={`group flex items-center px-4 py-2 bg-blue-gray-800 border border-black border-solid border-opacity-75 rounded-lg ${
            selectedTab === "today" ? "bg-opacity-100" : "hover:bg-opacity-100"
          }`}
          onClick={() => changeTab("today")}
        >
          <TabButton label="Today's Task" selected={selectedTab === "today"} />
        </div>
        <div className="border-r border-black border-opacity-75 h-8"></div>
        <div
          className={`group flex items-center px-4 py-2 bg-blue-gray-800 border border-black border-solid border-opacity-75 rounded-lg ${
            selectedTab === "feedback"
              ? "bg-opacity-100"
              : "hover:bg-opacity-100"
          }`}
          onClick={() => changeTab("feedback")}
        >
          <TabButton
            label="Overall Feedback"
            selected={selectedTab === "feedback"}
          />
        </div>
      </div>
      {/* Placeholder div based on selected tab */}
      <div className="mt-8 text-white text-center">
        {selectedTab === "today" && localTasks ? (
          <ul>
            {/* Display only the first task */}
            <li key={localTasks[0].id} className="text-lg mb-4">
              <div className="flex items-center">
                <div className="bg-[#525CEB] p-4 rounded-md flex-1">
                  {localTasks[0].description}
                </div>
              </div>
            </li>
          </ul>
        ) : null}
        {selectedTab === "feedback" && <div>Lol!</div>}
      </div>
      {/* Green "Finish Task" button */}
      {selectedTab === "today" && (
        <button
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={() => console.log(globalTasks)}
        >
          Finish Task
        </button>
      )}
    </div>
  );
};

export default TaskDisplayer;

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

/*
<ul>
              {tasks.map((task) => (
                <li key={task.id} className="text-lg mb-4">
                  <div className="flex items-center">
                    <div className="bg-[#525CEB] p-4 rounded-md flex-1">
                      {task.description}
                    </div>
                  </div>
                </li>
              ))}
            </ul>*/
