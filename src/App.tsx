import React, { useState, useCallback } from "react";
import { v4 as uuid } from "uuid";

import Header from "./components/Header";
import Layout from "./components/Layout";
import Footer from "./components/Footer";

export const TasksContext = React.createContext<any[]>([]);

const savedToDo = [
  {
    id: uuid(),
    content:
      "Currently, when sharing email, the user must hit return after entering an email address. Without hitting return, the email remains visible and the user is allowed to share the post but email is not sent. Find a solution to 'auto-complete' the email if the user leaves the user field.",
  },
  { id: uuid(), content: "3D Analysis will be more good. Canvas" },
];

const savedInProgress = [
  {
    id: uuid(),
    content:
      "Task management stuff almost completed and code is very important. Best practices must be followed.",
  },
];

const savedDone = [
  {
    id: uuid(),
    content:
      "Post comment and title should be made optional and remove extra stuff.",
  },
];

const savedColumns = {
  toDo: {
    name: "To do",
    items: savedToDo,
  },
  inProgress: {
    name: "In Progress",
    items: savedInProgress,
  },
  done: {
    name: "Done",
    items: savedDone,
  },
};

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
