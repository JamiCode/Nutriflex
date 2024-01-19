import React from "react";

const DashBoardMessage = ({ first_name }) => {
  return (
    <div>
      <h1 className="font-bold mb-4">Hi, {first_name}.</h1>
      <p className="text-sm">Here is what is happening today.</p>
    </div>
  );
};

export default DashBoardMessage;

DashBoardMessage;
