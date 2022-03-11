import React from "react";

import { TasksContext } from '../../App';

export const Header: React.FC<{}> = () => {
  const value = React.useContext(TasksContext);
  
  console.log(value);
  return (
    <header className="header">
      <a href="/" className="title">
        <h1>Task Management</h1>
      </a>
      <div className="project-container">
        <p className="project-text">
          4 <br /> Projects
        </p>
      </div>
    </header>
  );
};

export default Header;
