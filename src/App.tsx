import React, { useState, useCallback } from "react";
import { v4 as uuid } from "uuid";

import Header from "./components/Header";
import Layout from "./components/Layout";
import Footer from "./components/Footer";
import { savedColumns } from "./utilites/constants";

export const TasksContext = React.createContext<any[]>([]);

export const App: React.FC<{}> = () => {
  const [tasks, setTasks] = useState<any>(savedColumns);

  const handleNewTask = useCallback((task: string) => {
    setTasks((previousTaskColumns: any) => {
      return {
        ...previousTaskColumns,
        toDo: {
          ...previousTaskColumns.toDo,
          items: [
            ...previousTaskColumns.toDo.items,
            {
              id: uuid(),
              content: task,
            },
          ],
        },
      };
    });
  }, []);

  const handleTaskMovement = useCallback((task: any) => {
    setTasks(task);
  }, []);

  return (
    <TasksContext.Provider value={tasks}>
      <Header />
      <Layout
        handleNewTask={handleNewTask}
        handleTaskMovement={handleTaskMovement}
      />
      <Footer />
    </TasksContext.Provider>
  );
};

export default App;
