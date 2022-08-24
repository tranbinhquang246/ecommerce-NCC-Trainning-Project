/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import addIcon from '../../assets/addIcon.png';

function SlideImage({
  urlImg, index, slidesImg, setSlidesImg, poisitisons, setPoisitions,
}) {
  const [image, setImage] = useState(urlImg);
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    slidesImg[index] = file;
    setSlidesImg(slidesImg);
    poisitisons[index] = 'update';
    setPoisitions(poisitisons);
    setImage(URL.createObjectURL(file));
  };
  const deleteImg = () => {
    slidesImg[index] = '';
    setSlidesImg(slidesImg);
    poisitisons[index] = 'delete';
    setPoisitions(poisitisons);
    setImage('');
  };
  return (
    <div className="flex justify-center items-center w-full h-full group relative text-white">
      {image ? (
        <img className="w-full h-full object-full" src={image} alt="" />
      ) : (
        <img className="w-2/5 h-3/5 object-full" src={addIcon} alt="" />
      )}
      <div className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center bg-black items-center opacity-0 group-hover:h-full group-hover:opacity-50 duration-300" />
      <div className="flex flex-col absolute top-0 left-0 w-full h-0 justify-center items-center opacity-0 group-hover:h-full group-hover:opacity-100 duration-300">
        <div className="flex justify-center items-center mb-1 border border-white w-16 h-7 hover:bg-slate-100 hover:text-slate-900 duration-500">
          <label htmlFor={index}>Cập nhật</label>
          <input id={index} type="file" onChange={handleChangeFile} hidden />
        </div>
        <div
          className="flex justify-center items-center border border-white w-16 h-7 mt-1 hover:bg-slate-100 hover:text-slate-900 duration-500"
          onClick={deleteImg}
        >
          <label>Xóa</label>
        </div>
      </div>
    </div>
  );
}

export default SlideImage;
