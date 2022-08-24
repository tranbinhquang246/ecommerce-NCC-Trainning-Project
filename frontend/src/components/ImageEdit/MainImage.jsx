/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';

function MainImage({
  avatar, mainImg, setMainImg, poisitisons, setPoisitions,
}) {
  const [Image, setImage] = useState(avatar);
  console.log(poisitisons);
  const handleChangeFile = (e) => {
    const [file] = e.target.files;
    mainImg[0] = file;
    setMainImg(mainImg);
    poisitisons[0] = 'update';
    setPoisitions(poisitisons);
    setImage(URL.createObjectURL(file));
  };

  return (
    <div className="w-full h-full group relative text-white">
      <img className="w-full h-full object-full" src={Image} alt="" />
      <div className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center bg-black items-center opacity-0 group-hover:h-full group-hover:opacity-50 duration-300" />
      <div className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center opacity-0 group-hover:h-full group-hover:opacity-100 duration-300">
        <label
          htmlFor="avatar"
          className="border border-white pt-2 pb-2 pl-3 pr-3 hover:bg-slate-100 hover:text-slate-900 duration-500"
        >
          Cập nhật
        </label>
        <input id="avatar" type="file" onChange={handleChangeFile} hidden />
      </div>
    </div>
  );
}

export default MainImage;
