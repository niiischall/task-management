import React, { useEffect, useState } from "react";

import { TasksContext } from "../../App";

export const Header: React.FC<{}> = () => {
  const tasks = React.useContext(TasksContext);
  const [numberOfProjects, setNumberOfProjects] = useState<number>(0);

  useEffect(() => {
    const taskColumns = Object.values(tasks);
    if (taskColumns.length > 0) {
      const sumWithInitial = taskColumns.reduce(
        (previousValue, currentValue) => {
          return previousValue + currentValue.items.length;
        },
        0
      );
      setNumberOfProjects(sumWithInitial);
    }
  }, [tasks]);

  return (
    <header className="header">
      <a href="/" className="title">
        <h1>Task Management</h1>
      </a>
      <div className="project-container">
        <p className="project-text">
          {numberOfProjects} <br />
          Projects
        </p>
      </div>
    </header>
  );
};

export default Header;
