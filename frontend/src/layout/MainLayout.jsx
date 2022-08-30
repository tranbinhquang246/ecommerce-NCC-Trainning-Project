/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
import React, { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Category from '../components/Category/Category';
// import ModalAdd from '../../components/Modal/ModaAdd';
export const DisableMenuContext = createContext();

function MainLayout() {
  //   const [openModalAdd, setOpenModalAdd] = useState(false);
  const [isDisableContext, setIsDisableContext] = useState(false);

  return (
    <DisableMenuContext.Provider value={{ isDisableContext, setIsDisableContext }}>
      <div className="relative flex flex-col w-full h-full">
        <Header />
        <div className="w-full h-full flex">
          <Category isDisableContext={isDisableContext} />
          <Outlet />
          {/* <Outlet context={[setOpenModalAdd]} /> */}
        </div>
        {/* {openModalAdd && <ModalAdd setOpenModalAdd={setOpenModalAdd} />} */}
      </div>
    </DisableMenuContext.Provider>
  );
}

export default MainLayout;
