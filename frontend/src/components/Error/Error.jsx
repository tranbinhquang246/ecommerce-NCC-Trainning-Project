import React from 'react';
import { Link } from 'react-router-dom';
import image404 from '../../assets/404img.jpg';

function Error() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col items-center justify-center w-10/12 h-divproduct">
        <img src={image404} alt="404" className="w-4/6 h-4/6" />
        <Link
          to="/"
          className="hover:bg-[#00CCFF] hover:text-white text-[#00CCFF] py-[0.4rem] px-4 rounded-md border border-[#00CCFF]"
        >
          Home
        </Link>
      </div>
    </div>
  );
}

export default Error;
