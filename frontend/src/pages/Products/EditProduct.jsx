import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import FormDataAdd from '../../components/Form/FormData';
import axios from '../../api/axios';
import MainImage from '../../components/ImageEdit/MainImage';
import SlideImage from '../../components/ImageEdit/SlideImage';
import ModalSuccess from '../../components/Modal/ModalSuccess';
import useLoading from '../../hooks/useLoading';

function EditProduct() {
  const location = useLocation();
  const [showLoading, hideLoading] = useLoading();
  const [dataProduct, setDataProduct] = useState();
  const idProduct = location.pathname.replace('/edit/', '');
  const [img, setImg] = useState(['', '', '', '', '']);
  const [poisitisons, setPoisitions] = useState(['', '', '', '', '']);
  const navigate = useNavigate();
  const [isModalSuccessVisible, setIsModalSuccessVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      showLoading();
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}products/${idProduct}`);
        setDataProduct(response);
      } catch (error) {
        console.error(error.message);
      } finally {
        hideLoading();
      }
    };
    fetchData();
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
        setTimeout(() => {
          navigate('/management');
          setIsModalSuccessVisible(false);
        }, 1000);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo.values);
  };

  return (
    <div className="flex justify-center items-center w-full h-full bg-slate-200">
      <div className="flex flex-col w-[81%] mt-[38px] mb-[49px] ml-[94px] mr-[96px]">
        {dataProduct ? (
          <Form
            className="flex w-full h-full bg-white overflow-y-scroll "
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              name: dataProduct?.name,
              category: dataProduct?.category,
              brand: dataProduct?.brand,
              price: dataProduct?.price,
              description: dataProduct?.description,
            }}
            form={form}
          >
            <div className="flex w-full h-full p-[21px]">
              <div className="flex flex-col w-1/2">
                <strong className="mb-2 text-sm">Thông tin sản phẩm</strong>
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
                  <button className="w-1/3 h-[40px] bg-sky-500 text-white" type="submit">
                    Lưu
                  </button>
                </div>
              </div>
              <div className="flex flex-col w-1/2 h-full pl-2 ">
                <div className="flex flex-col w-full p-2">
                  <p className="h-[10px]">Ảnh minh họa</p>
                  <div className="h-[216px]">
                    <MainImage
                      avatar={dataProduct?.mainImg}
                      mainImg={img}
                      setMainImg={setImg}
                      poisitisons={poisitisons}
                      setPoisitions={setPoisitions}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full p-2">
                  <p className="h-[40px]">Ảnh slide</p>
                  <div className="h-[94%] w-full grid xl:grid-cols-2 xl:grid-rows-2 grid-cols-1 grid-rows-1">
                    {dataProduct?.slidesImg.map((element, index) => (
                      <div className="flex flex-col w-full h-full">
                        <p className="h-[10px]">Ảnh {index + 1}</p>
                        <div className="w-full flex justify-center items-center ">
                          <div className="w-[192px] h-[118px]">
                            <SlideImage
                              key={Math.random()}
                              urlImg={element}
                              index={index + 1}
                              slidesImg={img}
                              setSlidesImg={setImg}
                              poisitisons={poisitisons}
                              setPoisitions={setPoisitions}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Form>
        ) : null}
      </div>
      <ModalSuccess
        rule="update"
        isModalSuccessVisible={isModalSuccessVisible}
        setIsModalSuccessVisible={setIsModalSuccessVisible}
      />
    </div>
  );
}

export default EditProduct;
