import React from "react";

import Input from '../Input';
import Lists from '../Lists';

export const Layout: React.FC<{}> = () => {

  return (
    <main className="layout">
      <Input />
      <Lists />
    </main>
  );
};

export default Layout;
