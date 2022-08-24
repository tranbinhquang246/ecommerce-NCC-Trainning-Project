/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';

import { Form, Spin } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import FormDataAdd from '../Form/FormData';
import axios from '../../api/axios';
import MainImage from '../ImageEdit/MainImage';
import SlideImage from '../ImageEdit/SlideImage';
import ModalSuccess from '../Modal/ModalSuccess';

function EditProduct() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [dataProduct, setDataProduct] = useState();
  const idProduct = location.pathname.replace('/edit/', '');
  const [img, setImg] = useState(['', '', '', '', '']);
  const [poisitisons, setPoisitions] = useState(['', '', '', '', '']);
  const navigate = useNavigate();
  const [isModalSuccessVisible, setIsModalSuccessVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}products/${idProduct}`);
        setDataProduct(response);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error.message);
      }
    };
    fetchData();
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [location]);
  const onFinish = (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('category', values.category);
    formData.append('brand', values.brand.toLowerCase());
    formData.append('price', values.price);
    formData.append('description', values.description);
    formData.append('img[]', img[0]);
    formData.append('img[]', img[1]);
    formData.append('img[]', img[2]);
    formData.append('img[]', img[3]);
    formData.append('img[]', img[4]);
    for (let i = 0; i < poisitisons.length; i += 1) {
      formData.append('poisitions[]', poisitisons[i]);
    }

    axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}products/${idProduct}`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(async () => {
        setIsModalSuccessVisible(true);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo.values);
    alert('False');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full bg-slate-200">
        <Spin spinning={loading} />
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center w-full h-full bg-slate-200">
      <Form
        className="flex w-10/12 h-divproduct"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          name: dataProduct.name,
          category: dataProduct.category,
          brand: dataProduct.brand.charAt(0).toUpperCase() + dataProduct.brand.slice(1),
          price: dataProduct.price,
          description: dataProduct.description,
        }}
        form={form}
      >
        <div className="flex flex-col w-1/2 h-full pl-2 pr-5">
          <strong className="mb-3 text-sm">Thông tin sản phẩm</strong>
          <FormDataAdd form={form} />
          <div className="flex justify-around items-center">
            <button
              className="w-1/3 h-[40px] border border-sky-500 text-sky-500 pl-5 pr-5"
              type="button"
              onClick={() => {
                navigate(-1);
              }}
            >
              Hủy
            </button>
            <button className="w-1/3 h-full bg-sky-500 text-white" type="submit">
              Lưu
            </button>
          </div>
        </div>
        <div className="flex flex-col w-1/2 h-full pl-2 ">
          <p>Ảnh minh họa</p>
          <div className="flex items-center justify-center w-full h-2/5 p-1">
            <MainImage
              avatar={dataProduct.mainImg}
              mainImg={img}
              setMainImg={setImg}
              poisitisons={poisitisons}
              setPoisitions={setPoisitions}
            />
          </div>
          <div className="flex flex-col w-full h-3/5">
            <p>Ảnh minh họa</p>
            <div className="flex w-full h-1/2">
              <div className=" w-1/2 h-full">
                <SlideImage
                  urlImg={dataProduct?.slidesImg[0]}
                  index="1"
                  slidesImg={img}
                  setSlidesImg={setImg}
                  poisitisons={poisitisons}
                  setPoisitions={setPoisitions}
                />
              </div>
              <div className=" w-1/2 h-full">
                <SlideImage
                  urlImg={dataProduct?.slidesImg[1]}
                  index="2"
                  slidesImg={img}
                  setSlidesImg={setImg}
                  poisitisons={poisitisons}
                  setPoisitions={setPoisitions}
                />
              </div>
            </div>
            <div className="flex w-full h-1/2">
              <div className=" w-1/2 h-full">
                <SlideImage
                  urlImg={dataProduct?.slidesImg[2]}
                  index="3"
                  slidesImg={img}
                  setSlidesImg={setImg}
                  poisitisons={poisitisons}
                  setPoisitions={setPoisitions}
                />
              </div>
              <div className=" w-1/2 h-full">
                <SlideImage
                  urlImg={dataProduct?.slidesImg[3]}
                  index="4"
                  slidesImg={img}
                  setSlidesImg={setImg}
                  poisitisons={poisitisons}
                  setPoisitions={setPoisitions}
                />
              </div>
            </div>
          </div>
        </div>
      </Form>
      <ModalSuccess
        rule="update"
        idProduct={idProduct}
        isModalSuccessVisible={isModalSuccessVisible}
        setIsModalSuccessVisible={setIsModalSuccessVisible}
      />
    </div>
  );
}

export default EditProduct;
