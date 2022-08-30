/* eslint-disable no-restricted-syntax */
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Category from '../components/Category/Category';
// import ModalAdd from '../../components/Modal/ModaAdd';

function MainLayout() {
  //   const [openModalAdd, setOpenModalAdd] = useState(false);

  return (
    <div className="relative flex flex-col w-full h-full">
      <Header />
      <div className="w-full h-full flex">
        <Category />
        <Outlet />
        {/* <Outlet context={[setOpenModalAdd]} /> */}
      </div>
      {/* {openModalAdd && <ModalAdd setOpenModalAdd={setOpenModalAdd} />} */}
    </div>
  );
}

export default MainLayout;
