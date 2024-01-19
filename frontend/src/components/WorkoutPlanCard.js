// WorkoutPlanCard.js
import React from "react";

const WorkoutPlanCard = ({ title, onClick }) => {
  return (
    <div
      className="bg-[#525CEB] rounded-lg p-6 shadow-md cursor-pointer transition-transform duration-300 transform hover:scale-105 mb-4"
      onClick={onClick}
    >
      <h2 className="text-xl font-bold dark:text-white">{title}</h2>
    </div>
  );
};

export default WorkoutPlanCard;
