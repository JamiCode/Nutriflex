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
import GeneralModal from "./GeneralModal";
import Loader from "./FadeOutLoader";

const TaskDisplayer = ({ workout_id }) => {
  const [selectedTab, setSelectedTab] = useState("today");
  const { globalTasks, setGlobalTasks } = useContext(TasksContext);
  const [localTasks, setLocalTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [completedTaskData, setCompletedTaskData] = useState([]);
  const [completedTaskError, setCompletedTaskError] = useState(null);
  const [comment, setComment] = useState("");
  const [showForm, setShowForm] = useState(false);

  const changeTab = (tab) => {
    setSelectedTab(tab);
  };

  const fetchCompletedTask = async () => {
    if (workout_id) {
      try {
        const completedTasksResponse = await axios_.get(
          `api/workout-plan/tasks/completed/${workout_id}`
        );
        const completedData = completedTasksResponse.data;
        setCompletedTaskData(completedData);
      } catch (error) {
        console.log(error);
        setCompletedTaskError(error.message);
      }
    }
  };

  useEffect(() => {
    const fetchTaskData = async () => {
      if (workout_id) {
        try {
          const tasksDataResponse = await axios_(
            `api/workout-plan/tasks/${workout_id}`
          );
          setGlobalTasks(tasksDataResponse.data);
          setLocalTasks(tasksDataResponse.data);
          console.log(globalTasks);
        } catch (error) {
          console.error("Error fetching task data:", error);
        }
      }
    };
    fetchTaskData();
    fetchCompletedTask();
    handleRenderForm();
  }, [workout_id, selectedTab]);

  const handleNextTask = () => {
    const immediateTask = localTasks[0];
    const updatedTasks = localTasks.slice(1);
    //  Sets task on server as completed
    const updateTaskCompletedStatus = async (immediateTask) => {
      try {
        const response = await axios_.get(
          `api/workout-plan/task/set_complete_status/${immediateTask.id}`
        );
      } catch (error) {
        console.log(error);
      }
    };
    const updateTaskSkippedStatus = async (immediateTask) => {
      try {
        const response = await axios_.get(
          `api/workout-plan/task/set_task_skipped/${immediateTask.id}`
        );
      } catch (error) {
        console.log(error);
      }
    };

    setLoading(true);
    setLocalTasks(updatedTasks); // this sets the task without the first task

    if (immediateTask.is_done) {
      setTimeout(() => {
        // Set loading back to fals
        updateTaskCompletedStatus(immediateTask);
        setLoading(false);
      }, 2000);
    } else if (!immediateTask.is_done) {
      setTimeout(() => {
        // Set loading back to false on server
        updateTaskSkippedStatus(immediateTask);
        setLoading(false);
      }, 2000);
    }
  };
  const handleCheckboxChange = () => {
    // When the checkbox is clicked, update localTasks[0].is_done
    if (localTasks.length > 0) {
      console.log(localTasks, "initial");
      const updatedTaskss = [...localTasks];
      updatedTaskss[0].is_done = !updatedTaskss[0].is_done;
      console.log(updatedTaskss, "after update");

      setLocalTasks(updatedTaskss); // registers the update to client
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
                className="form-checkbox h-4 w-4 text-blue-500"
                checked={localTasks[0].is_done}
                onChange={handleCheckboxChange}
              />
              {/* {console.log(localTasks, "poop  ")} */}
              <p className="ml-2 text-white inline text-lg">Task Completed</p>
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
      // Set showForm to true after 3000 milliseconds (3 seconds)
      setTimeout(() => {
        setShowForm(true);
      }, 3000);
    }
  };

  const handleNextButtonRender = () => {
    // Check if localTasks is not empty and the first task is not completed
    const shouldShowModal = localTasks.length > 0 && !localTasks[0].is_done;

    if (localTasks.length > 0) {
      return (
        <>
          <button
            className={`mt-4 px-6 py-2 ${
              loading
                ? "bg-gray-500"
                : localTasks.length > 0 && localTasks[0].is_done
                ? "bg-green-500"
                : "bg-red-500"
            } text-white rounded-md hover:bg-green-600`}
            onClick={() => {
              // Show the modal when the button is clicked
              if (shouldShowModal) {
                setShowModal(true);
              } else {
                // If the task is completed or localTasks is empty, proceed to the next task
                handleNextTask();
              }
            }}
          >
            Next Task
          </button>

          {/* General Modal for incomplete task */}
          <GeneralModal
            title="Incomplete Task"
            message="Note: You have not completed your current task. Are you sure you want to move on to the next task?"
            onCancel={() => setShowModal(false)}
            onConfirm={() => {
              setShowModal(false);
              // Proceed to the next task when confirmed
              handleNextTask();
            }}
            showModal={showModal}
          />
        </>
      );
    } else {
      return null;
    }
  };
  const handleCompletedTaskRender = () => {
    if (completedTaskError) {
      return (
        <div className="bg-red-500 p-4 rounded-md flex-1">
          <p className="text-white">{completedTaskError}</p>
        </div>
      );
    }

    return (
      <div className="bg-[#525CEB] p-4 rounded-md flex-1">
        <h2 className="text-2xl font-bold mb-4">Completed Tasks</h2>
        {completedTaskData.length === 0 ? (
          <p className="text-lg text-gray-400">
            You have no completed tasks yet.
          </p>
        ) : (
          <ul>
            {completedTaskData.map((task) => (
              <li key={task.id} className="mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-bold">{task.description}</p>
                    <p className="text-sm text-gray-400">
                      Completed on: {task.day_to_be_done}
                    </p>
                  </div>
                  {/* Add any additional flair or icons as needed */}
                  <div className="flex items-center space-x-2">
                    {/* Example: checkmark icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      {/* Render tabs only if showForm is false */}
      {!showForm && (
        <div className="flex justify-center space-x-4">
          <div
            className={`group flex items-center px-4 py-2 bg-blue-gray-800 border border-black border-solid border-opacity-75 rounded-lg ${
              selectedTab === "today"
                ? "bg-opacity-100"
                : "hover:bg-opacity-100"
            }`}
            onClick={() => changeTab("today")}
          >
            <TabButton
              label="Today's Task"
              selected={selectedTab === "today"}
            />
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
      )}

      {/* Placeholder div based on selected tab */}
      <div className="mt-8 text-white text-center">
        {/* Render feedback form if showForm is true */}
        {showForm ? (
          <FeedbackForm
            comment={comment}
            setComment={setComment}
            workout_id={workout_id}
          />
        ) : (
          <>
            {selectedTab === "today" && localTasks && localTasks.length > 0 ? (
              <ul>
                {/* Display only the first task in this card */}
                <li key={localTasks[0].id} className="text-lg mb-4">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <div className="bg-[#525CEB] p-4 rounded-md flex-1">
                        <h2 className="text-2xl font-bold mb-4">
                          {" "}
                          Task For the Day
                        </h2>
                        {loading ? (
                          // Display the loader while loading
                          <Loader />
                        ) : (
                          // Render tasks when data is loaded
                          handleRenderTasks()
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            ) : (
              // Render FeedbackForm if showForm is true
              localTasks.length === 0 &&
              showForm && (
                <FeedbackForm
                  comment={comment}
                  setComment={setComment}
                  workout_id={workout_id}
                />
              )
            )}

            {selectedTab === "completedTask" && handleCompletedTaskRender()}
          </>
        )}
      </div>
      {/* Green "Finish Task" button */}
      {!showForm && selectedTab === "today" && handleNextButtonRender()}
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
