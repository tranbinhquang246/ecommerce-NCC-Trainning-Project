import React, { useState } from 'react';
import { toast } from 'react-toastify';
import addIcon from '../../assets/addIcon.png';
import 'react-toastify/dist/ReactToastify.css';

function SlideImage({
  urlImg, index, slidesImg, setSlidesImg, poisitisons, setPoisitions,
}) {
  const [image, setImage] = useState(urlImg);
  const slidesImage = slidesImg;
  const poisitionImage = poisitisons;
  const handleChangeFile = async (e) => {
    const file = await e.target.files[0];
    const nameFile = file?.name;
    const formatFile = nameFile?.substring(nameFile.lastIndexOf('.') + 1).toLowerCase();
    if (formatFile === 'png' || formatFile === 'jpeg' || formatFile === 'jpg') {
      slidesImage[index] = file;
      setSlidesImg(slidesImg);
      poisitionImage[index] = 'update';
      setPoisitions(poisitisons);
      setImage(URL.createObjectURL(file));
    } else {
      toast.error('Vui lòng chọn 1 hình ảnh', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const deleteImg = () => {
    slidesImage[index] = '';
    setSlidesImg(slidesImg);
    poisitionImage[index] = 'delete';
    setPoisitions(poisitisons);
    setImage('');
  };
  return (
    <div className="flex justify-center items-center w-full h-full group relative text-white">
      {image ? (
        <div className="flex justify-center items-center w-full h-full p-1">
          <img className="w-full h-full object-full" src={image} alt="" />
          <div className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center bg-black items-center opacity-0 group-hover:h-full group-hover:opacity-50 duration-300" />
          <div className="flex flex-col absolute top-0 left-0 w-full h-0 justify-center items-center opacity-0 group-hover:h-full group-hover:opacity-100 duration-300">
            <label
              className="flex justify-center items-center w-[50%] h-[35%] mb-1 border border-white hover:bg-slate-100 hover:text-slate-900 duration-500"
              htmlFor={index}
            >
              Cập nhật
              <input
                id={index}
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={handleChangeFile}
                hidden
              />
            </label>

            <button
              className="flex justify-center items-center w-[50%] h-[35%] border border-white mt-1 hover:bg-slate-100 hover:text-slate-900 duration-500"
              type="button"
              onClick={deleteImg}
            >
              Xóa
            </button>
          </div>
        </div>
      ) : (
        <label
          className="flex justify-center items-center w-full h-full cursor-pointer"
          htmlFor={index}
        >
          <img className="w-[40%] h-[60%] object-full" src={addIcon} alt="" />
          <input id={index} type="file" onChange={handleChangeFile} hidden />
        </label>
      )}
    </div>
  );
}

export default SlideImage;
