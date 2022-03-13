import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import { TasksContext } from "../../App";

import Input from "../Input";
import Lists from "../Lists";

export interface Props {
  handleNewTask: Function;
  handleTaskMovement: Function;
}

export const Layout: React.FC<Props> = ({
  handleNewTask,
  handleTaskMovement,
}) => {
  const taskColumns = React.useContext(TasksContext);
  return (
    <main className="layout">
      <Input handleSubmit={handleNewTask} />
      <Lists columns={taskColumns} handleMovement={handleTaskMovement} />
    </main>
  );
};

export default Layout;
