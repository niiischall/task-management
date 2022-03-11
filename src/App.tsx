import React, { useState } from "react";

import Header from './components/Header';
import Layout from "./components/Layout";
import Footer from "./components/Footer";

export const TasksContext = React.createContext<any[]>([]);

export const App: React.FC<{}> = () => {
  const [tasks, setTasks] = useState<any[]>([]);

  const addTaskHandler = () => {
    console.log('Add task!');
  }

  const editTaskHandler = () => {
    console.log('edit task!');
  }


  return (
    <TasksContext.Provider value={tasks}>
      <Header />
      <Layout />
      <Footer />
    </TasksContext.Provider>
  );
};

export default App;
