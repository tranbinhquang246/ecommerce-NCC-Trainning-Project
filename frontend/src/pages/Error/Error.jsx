import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import imageerr from '../../assets/err.webp';
import { DisableMenuContext } from '../../layout/MainLayout';

function Error() {
  const { setIsDisableContext } = useContext(DisableMenuContext);
  useEffect(() => {
    setIsDisableContext(false);
  }, []);
  return (
    <div className="flex justify-center items-center w-full h-full bg-slate-200">
      <div className="flex flex-col w-[81%] mt-[38px] mb-[49px] ml-[94px] mr-[96px]">
        <div className="flex flex-col justify-center items-center w-full min-h-[743px] bg-white pt-[46px] pb-[50px] pl-[56px] pr-[56px] rounded-md">
          <img src={imageerr} alt="404" className="w-4/6 h-4/6" />
          <Link
            to="/"
            className="hover:bg-[#00CCFF] hover:text-white text-[#00CCFF] py-[0.4rem] px-4 rounded-md border border-[#00CCFF]"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Error;
