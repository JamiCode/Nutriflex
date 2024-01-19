import React from "react";

const ThreeContainersComponent = ({ nutrition_meals }) => {
  return (
    <div className="flex flex-col p-4 md:flex-row md:space-x-4">
      {/* Container 1 */}
      <div className="flex-1 bg-blue-500 p-4 rounded-md mb-4 md:mb-0 h-[400px]">
        <h2 className="text-lg font-bold mb-2 text-white">Breakfast</h2>
        <ul className="space-y-2">
          {nutrition_meals[0].food_suggestions.map((item, index) => (
            <li className="text-white mb-1" key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Container 2 */}
      <div className="flex-1 bg-green-500 p-4 rounded-md mb-4 md:mb-0 h-[400px]">
        <h2 className="text-lg font-bold mb-2 text-white">Lunch</h2>
        <ul className="space-y-2">
          {nutrition_meals[1].food_suggestions.map((item, index) => (
            <li className="text-white mb-1" key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Container 3 */}
      <div className="flex-1 bg-yellow-500 p-4 rounded-md h-[400px]">
        <h2 className="text-lg font-bold mb-2 text-white">Dinner</h2>
        <ul className="space-y-2">
          {nutrition_meals[2].food_suggestions.map((item, index) => (
            <li className="text-white mb-1" key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ThreeContainersComponent;
