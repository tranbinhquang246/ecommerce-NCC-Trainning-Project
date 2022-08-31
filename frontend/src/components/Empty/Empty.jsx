import React from 'react';
import emptyIcons from '../../assets/empty.png';

function Empty() {
  return (
    <div className="flex justify-center items-center w-full h-[600px] bg-white">
      <img src={emptyIcons} alt="empty" className="" />
    </div>
  );
}

export default Empty;
