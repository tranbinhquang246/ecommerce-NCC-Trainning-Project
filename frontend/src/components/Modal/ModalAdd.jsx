/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { useSearchParams } from 'react-router-dom';
import { Form, Modal } from 'antd';
import { RiCloseCircleFill } from 'react-icons/ri';
import axios from '../../api/axios';
import FormDataAdd from '../Form/FormData';

function ModalAdd(props) {
  const {
    setDataProducts, isModalAddVisible, setIsModalAddVisible, setIsModalSuccessVisible,
  } = props;
  const [category, setCategory] = useState([]);
  const [value, setValue] = useState([]);
  const [brands, setBrands] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      let arrCategory = [];
      let arrValue = [];
      let arrBrands = [];
      try {
        const response = await axios.get('http://localhost:5000/dropdown');
        response.data[0].data?.map((element) => {
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
      .then(async () => {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}products?category=${
            searchParams.get('category') || ''
          }&brand=${searchParams.get('brand') || ''}&page=${searchParams.get('page') || '1'}`,
        );
        setDataProducts(response);
        setIsModalAddVisible(false);
        setIsModalSuccessVisible(true);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    alert('False');
  };

  return (
    <Modal visible={isModalAddVisible} footer={null}>
      <div className="flex w-full justify-center items-center">
        <div className="flex flex-col items-center bg-white rounded-lg">
          <div className="flex justify-between w-11/12 mt-2">
            <p className="font-medium"> THÊM SẢN PHẨM</p>
            <IconContext.Provider value={{ size: '1.25em' }}>
              <div>
                <RiCloseCircleFill
                  onClick={() => setIsModalAddVisible(false)}
                  className="cursor-pointer"
                />
              </div>
            </IconContext.Provider>
          </div>
          <div className="flex justify-center w-5/6 overflow-scroll mb-2 mt-2">
            <Form
              className="w-[500px]"
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
                  onClick={() => setIsModalAddVisible(false)}
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
    </Modal>
  );
}

export default ModalAdd;
