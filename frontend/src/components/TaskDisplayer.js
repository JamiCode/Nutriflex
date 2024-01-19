import React, { useContext, useEffect, useState } from "react";
import TasksContext from "./TasksProvider";
import axios_ from "@/api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faClock,
  faCheckCircle,
  faTimesCircle,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";
import FeedbackForm from "./forms/FeedBackForm";
const TaskDisplayer = ({ workout_id }) => {
  const [selectedTab, setSelectedTab] = useState("today");
  const { globalTasks, setGlobalTasks } = useContext(TasksContext);
  const [localTasks, setLocalTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const changeTab = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    const fetchTaskData = async () => {
      if (workout_id) {
        console.log("Hit");
        try {
          const tasksDataResponse = await axios_(
            `api/workout-plan/tasks/${workout_id}`
          );
          console.log(tasksDataResponse.data);
          setGlobalTasks(tasksDataResponse.data);
          setLocalTasks(tasksDataResponse.data);
        } catch (error) {
          console.error("Error fetching task data:", error);
        }
      }
    };
    fetchTaskData();
  }, [workout_id]);

  const handleNextTask = () => {
    const updateTaskCompletedStatus = async () => {
      try {
        const response = await axios_.get(
          `api/workout-plan/task/set_complete_status/${localTasks[0].id}`
        );
      } catch (error) {
        console.log(error);
      }
    };
    // When user finishes the task, remove it from the state
    if (localTasks.length > 0 && localTasks[0].is_done) {
      setLoading(true);
      const updatedTasks = localTasks.slice(1);
      setLocalTasks(updatedTasks);

      // Simulate loading for 3 seconds
      setTimeout(() => {
        // Set loading back to false
        updateTaskCompletedStatus();
        setLoading(false);
      }, 2000);
    } else if (!localTasks[0].is_done) {
      alert(
        "Cannot Load the next task without completing your task. if you have completed your task please click on the checkbox   "
      );
    }
  };
  const handleCheckboxChange = () => {
    // When the checkbox is clicked, update localTasks[0].is_done
    if (localTasks.length > 0) {
      const updatedTasks = [...localTasks];
      updatedTasks[0].is_done = !updatedTasks[0].is_done;
      setLocalTasks(updatedTasks);
    }
  };

  const handleRenderTasks = () => {
    if (!loading && localTasks.length > 0) {
      return (
        <>
          {localTasks[0].description}
          <div className="text-sm text-gray-400 mt-2">
            <span className="text-white">
              <p className="text-lg font-bold">
                <FontAwesomeIcon icon={faClock} className="mr-2" />
                Duration: {localTasks[0].duration}
              </p>
              <p className="text-lg font-bold">
                <FontAwesomeIcon
                  icon={localTasks[0].is_done ? faCheckCircle : faTimesCircle}
                  className={`mr-2 ${
                    localTasks[0].is_done ? "text-green-500" : "text-red-500"
                  }`}
                />
                Status: {localTasks[0].is_done ? "Completed" : "Not Completed"}
              </p>
              <p className="text-lg font-bold">
                <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                Date: {localTasks[0].day_to_be_done}
              </p>
            </span>
            {/* Tailwind-styled radio button */}
            <div className="mt-4">
              <input
                type="checkbox"
                className="form-checkbox h-6 w-6 text-blue-500"
                checked={localTasks[0].is_done}
                onChange={handleCheckboxChange}
              />
              <label className="ml-2 text-white">Task Completed</label>
            </div>
          </div>
        </>
      );
    } else {
      return null; // or any other fallback content you want to render when loading or localTasks is empty
    }
  };

  const handleRenderForm = () => {
    if (selectedTab === "today" && localTasks.length === 0) {
      return <FeedbackForm />;
    }
    return null;
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
            selectedTab === "completedTask"
              ? "bg-opacity-100"
              : "hover:bg-opacity-100"
          }`}
          onClick={() => changeTab("completedTask")}
        >
          <TabButton
            label="Completed Tasks"
            selected={selectedTab === "completedTask"}
          />
        </div>
      </div>
      {/* Placeholder div based on selected tab */}
      <div className="mt-8 text-white text-center">
        {selectedTab === "today" && localTasks && localTasks.length > 0 ? (
          <ul>
            {/* Display only the first task in this card */}
            <li key={localTasks[0].id} className="text-lg mb-4">
              <div className="flex items-center">
                <div className="flex items-center">
                  <div className="bg-[#525CEB] p-4 rounded-md flex-1">
                    {handleRenderTasks()}

                    <ClipLoader
                      color={"red"}
                      loading={loading}
                      size={30}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                    {loading && <p> Loading New Task </p>}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        ) : (
          handleRenderForm()
        )}
        {selectedTab === "completedTask" && <div>Lol!</div>}
      </div>
      {/* Green "Finish Task" button */}
      {selectedTab === "today" && (
        <button
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={handleNextTask}
        >
          {loading ? "Loading Next Task..." : "Next Task"}
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
