// WorkoutPlanCard.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const WorkoutPlanCard = ({ title, description, onClick }) => {
  return (
    <div
      className="bg-[#525CEB] rounded-lg p-6 shadow-md cursor-pointer transition-transform duration-300 transform hover:scale-105 mb-4"
      onClick={onClick}
    >
      <h2 className="text-xl font-bold dark:text-white">
        <FontAwesomeIcon icon={faDumbbell} className="mr-2" /> {title}
      </h2>
      <p className="text-sm text-white font-bold mb-2">
        <FontAwesomeIcon icon={faInfoCircle} className="mr-2" /> description
      </p>
      <p className="text-sm text-white">
        {description || "Lorem Ipsum Overview"}
      </p>
    </div>
  );
};

export default WorkoutPlanCard;
