import React from "react";

export const Header: React.FC<{}> = () => {
  return (
    <header className="header">
      <a href="/" className="title">
        Task Management
      </a>
      <div className="project-container">
        <span className="project-text">
          4 <br /> Projects
        </span>
      </div>
    </header>
  );
};

export default Header;
