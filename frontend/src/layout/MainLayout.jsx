import React, { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Category from '../components/Category/Category';

export const DisableMenuContext = createContext();

function MainLayout() {
  const [isDisableContext, setIsDisableContext] = useState(false);

  return (
    <DisableMenuContext.Provider value={{ isDisableContext, setIsDisableContext }}>
      <div className="relative flex flex-col w-full h-full">
        <Header />
        <div className="w-full h-full flex">
          <Category isDisableContext={isDisableContext} />
          <Outlet />
        </div>
      </div>
    </DisableMenuContext.Provider>
  );
}

export default MainLayout;
