/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IconContext } from 'react-icons';
import { Form } from 'antd';
import { RiCloseCircleFill } from 'react-icons/ri';
import FormDataAdd from '../Form/FormData';
import ModalAddSuccess from './ModalAddSuccess';

function ModaAdd({ setOpenModalAdd }) {
  const [category, setCategory] = useState([]);
  const [isModalAddSuccessVisible, setIsModalAddSuccesVisible] = useState(false);
  const [value, setValue] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let arrCategory = [];
      let arrValue = [];
      let arrBrands = [];
      try {
        const response = await axios.get('http://localhost:5000/dropdown');
        response.data.data[0].data?.map((element) => {
          arrCategory = [...arrCategory, element.categoryName];
          arrValue = [...arrValue, element.value];
          arrBrands = [...arrBrands, element.brand];
          setCategory(arrCategory);
          setValue(arrValue);
          setBrands(arrBrands);
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  const onFinish = (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('category', values.category);
    formData.append('brand', values.brand);
    formData.append('price', values.price);
    formData.append('description', values.description);
    formData.append('mainImg', values.mainImg.file);

    axios({
      method: 'post',
      url: 'http://localhost:5000/products',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    setIsModalAddSuccesVisible(true);
    setOpenModalAdd(false);
  };

  return (
    <>
      <div className="absolute flex justify-center items-center w-screen h-screen bg-black z-0 opacity-50" />
      <div className="absolute flex justify-center items-center w-screen h-screen z-0">
        <div className="w-1/2 h-5/6 flex flex-col items-center bg-white rounded-lg">
          <div className="flex justify-between w-11/12 mt-2">
            <p className="font-medium"> THÊM SẢN PHẨM</p>
            <IconContext.Provider value={{ size: '1.25em' }}>
              <div>
                <RiCloseCircleFill
                  onClick={() => setOpenModalAdd(false)}
                  className="cursor-pointer"
                />
              </div>
            </IconContext.Provider>
          </div>
          <div className="flex justify-center w-5/6 overflow-scroll mb-2 mt-2">
            <Form
              className="w-[300px] lg:w-[500px]"
              name="basic"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <FormDataAdd category={category} brands={brands} values={value} />
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setOpenModalAdd(false)}
                  className="border border-sky-500 px-10 text-sky-500 py-1 rounded-xl mr-1 mb-2 hover:shadow-sm hover:shadow-slate-600 hover:duration-150"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-sky-500 px-10 text-white py-1 rounded-xl ml-1 mb-2 hover:shadow-sm hover:shadow-black hover:duration-150"
                >
                  Thêm
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <ModalAddSuccess
        isModalAddSuccessVisible={isModalAddSuccessVisible}
        setIsModalAddSuccesVisible={setIsModalAddSuccesVisible}
      />
    </>
  );
}

export default ModaAdd;
