import axios from "@/api/axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const TasksContext = React.createContext({
  globalTasks: [],
  setGlobalTasks: () => {},
});

export const TasksProvider = ({ children }) => {
  const [globalTasks, setGlobalTasks] = useState([]);

  return (
    <TasksContext.Provider
      value={{
        globalTasks,
        setGlobalTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContext;
