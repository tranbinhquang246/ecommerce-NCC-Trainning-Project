import React, { useState } from 'react';
import emptyIcons from '../../assets/empty.png';
import ModalSuccess from '../../components/Modal/ModalSuccess';

function Empty() {
  const [isModalSuccessVisible, setIsModalSuccessVisible] = useState(false);
  return (
    <div className="flex justify-center items-center w-full h-full bg-white">
      <img src={emptyIcons} alt="" className="w-1/2 h-2/3" />
      <ModalSuccess
        rule="delete"
        isModalSuccessVisible={isModalSuccessVisible}
        setIsModalSuccessVisible={setIsModalSuccessVisible}
      />
    </div>
  );
}

export default Empty;
