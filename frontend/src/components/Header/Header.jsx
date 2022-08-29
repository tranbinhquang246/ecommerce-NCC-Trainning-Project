import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';

function Header() {
  return (
    <div className="flex w-full h-[6.5%] bg-[#00ADE8] text-white">
      <div className=" flex justify-center items-center w-divlogo h-full">
        <img src={logo} alt="logo" className="mr-1 h-[20px] w-[20px] md:h-1/2 md:w-[30px]" />
        <strong className="text-white text-lg md:text-2xl font-petrona">NCC</strong>
      </div>
      <div className=" flex justify-start items-center h-full w-full">
        <div className="ml-20">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive
              ? 'text-white text-xs font-sans font-medium hover:cursor-not-allowed hover:text-white'
              : 'text-white text-xs font-sans cursor-pointer hover:text-slate-300')}
          >
            SẢN PHẨM
          </NavLink>
        </div>
        <div className="ml-10">
          <NavLink
            to="/management"
            className={({ isActive }) => (isActive
              ? 'text-white text-xs font-sans font-medium hover:cursor-not-allowed hover:text-white'
              : 'text-white text-xs font-sans  cursor-pointer hover:text-slate-200')}
          >
            QUẢN LÝ SẢN PHẨM
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Header;
