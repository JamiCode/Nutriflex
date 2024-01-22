import axios_ from "@/api/axios";
import React, { useState } from "react";
import FeedBackModal from "../FeedBackModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeedbackForm = ({ comment, setComment, workout_id }) => {
  const [feedback, setFeedback] = useState("");
  const [tasksCompleted, setTasksCompleted] = useState();
  const [weightChangeType, setWeightChangeType] = useState("Increased by");
  const [weightChangeValue, setWeightChangeValue] = useState("");
  const [taskUpdateComment, setTaskUpdateComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "feedback") {
      setFeedback(value);
    } else if (name === "tasksCompleted") {
      setTasksCompleted(value);
    } else if (name === "weightChangeType") {
      setWeightChangeType(value);
    } else if (name === "weightChangeValue") {
      setWeightChangeValue(value);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const handleSendReport = async () => {
    try {
      const report_body = {
        completed_tasks: `${tasksCompleted}/7`,
        week_weight_change:
          weightChangeType == "Increased by"
            ? `+${weightChangeValue}`
            : `-${weightChangeValue}`,
        comment: feedback,
      };

      const response = await axios_.post(
        `/api/workout-plan/task/update_task/${workout_id}`,
        report_body,
        {
          withCredentials: true,
        }
      );
      fireToast();
      setComment(response.data.comment);
      setTaskUpdateComment(response.data.comment);
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
      setIsSuccess(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    openModal();
    await handleSendReport();
    setIsLoading(false);
  };

  const fireToast = () => {
    toast("A New Set of Tasks has been generated");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-[#2E3496] rounded-md shadow-md text-left">
      <h2 className="text-2xl font-semibold mb-4 text-white">Feedback Form</h2>
      <p className="text-gray-300 mb-4">
        Feedback information on workout task is needed to generate the next set
        of tasks for the week.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="feedback"
          >
            Your Feedback:
          </label>
          <textarea
            id="feedback"
            name="feedback"
            value={feedback}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
            placeholder="Provide your feedback here."
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="tasksCompleted"
          >
            Tasks Completed (/7):
          </label>
          <input
            type="number"
            id="tasksCompleted"
            name="tasksCompleted"
            value={tasksCompleted}
            onChange={handleInputChange}
            min="1"
            max="7"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
            placeholder="Enter the number of tasks completed"
            required
          />
        </div>

        <div className="mb-4 flex space-x-4">
          <div className="flex-1">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="weightChangeType"
            >
              Weight Change:
            </label>
            <select
              id="weightChangeType"
              name="weightChangeType"
              value={weightChangeType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
            >
              <option value="Increased by">Increased by</option>
              <option value="Decreased by">Decreased by</option>
            </select>
          </div>
          <div className="flex-1">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="weightChangeValue"
            >
              Weight Change Value (kg):
            </label>
            <input
              type="text"
              id="weightChangeValue"
              name="weightChangeValue"
              value={weightChangeValue}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
              placeholder="Enter weight change value"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Submit Feedback
        </button>
      </form>
      <FeedBackModal
        comment={comment}
        setComment={comment}
        isOpen={isModalOpen}
        isLoading={isLoading}
        isSuccess={isSuccess}
        onClose={closeModal}
      />
      <ToastContainer />
    </div>
  );
};

export default FeedbackForm;
