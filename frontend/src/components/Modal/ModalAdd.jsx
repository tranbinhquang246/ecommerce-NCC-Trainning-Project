import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Form, Modal, Upload } from 'antd';
import { RiCloseCircleFill } from 'react-icons/ri';
import { GrFormAdd } from 'react-icons/gr';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import FormDataAdd from '../Form/FormData';
import validateImage from '../../validateForm/validateImage';
import 'react-toastify/dist/ReactToastify.css';

function ModalAdd(props) {
  const {
    setDataProducts,
    isModalAddVisible,
    setIsModalAddVisible,
    setIsModalSuccessVisible,
    setIsModalErrorVisible,
    setAction,
  } = props;
  const [isButtonShow, setIsButtonShow] = useState(true);
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

  const uploadButton = (
    <div className="flex flex-col justify-center items-center">
      <GrFormAdd />
      <div style={{ marginTop: 8 }}>
        Thêm <br /> hình ảnh
      </div>
    </div>
  );

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const onFinish = (values) => {
    setIsButtonShow(false);
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('category', values.category);
    formData.append('brand', values.brand);
    formData.append('price', values.price);
    formData.append('description', values.description || '');
    formData.append('mainImg', values.mainImg.file);
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}products`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(async (response) => {
        const dataProduct = await axios.get(
          `${process.env.REACT_APP_API_URL}products?category=${
            searchParams.get('category') || ''
          }&brand=${searchParams.get('brand') || ''}&page=${
            searchParams.get('page') || '1'
          }&searchWord=${searchParams.get('search') || ''}`,
        );
        setDataProducts(dataProduct);
        setAction('add');
        setIsModalAddVisible(false);
        setIsModalSuccessVisible(true);
        setTimeout(() => {
          navigate(`/product/${response._id}`);
          setIsModalSuccessVisible(false);
        }, 1000);
      })
      .catch(() => {
        setIsModalErrorVisible(true);
        setIsButtonShow(true);
        toast.error('Không thể thêm sản phẩm, đã có lỗi xảy ra', {
          position: 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const onFinishFailed = () => {
    toast.error('Vui lòng nhập đầy đủ và chính xác các trường', {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const handleCancel = () => {
    setIsModalAddVisible(false);
    setFileList([]);
    form.resetFields();
  };

  return (
    <Modal visible={isModalAddVisible} onCancel={handleCancel} footer={null} closable={false}>
      <div className="flex w-full justify-center items-center">
        <div className="flex flex-col items-center bg-white rounded-lg">
          <div className="flex justify-between w-11/12 mt-2">
            <p className="font-medium"> THÊM SẢN PHẨM</p>
            <IconContext.Provider value={{ size: '1.25em' }}>
              <div>
                <RiCloseCircleFill onClick={() => handleCancel()} className="cursor-pointer" />
              </div>
            </IconContext.Provider>
          </div>
          <div className="flex justify-center w-5/6 mb-2 mt-2">
            <Form
              className="w-[500px]"
              name="basic"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              form={form}
            >
              <FormDataAdd form={form} />
              <div className="h-[200px]">
                <Form.Item
                  style={{ marginTop: '-5px' }}
                  name="mainImg"
                  label="Upload"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn 1 bức ảnh',
                    },
                    {
                      message: 'Vui lòng lựa chọn file hình ảnh',
                      validator: validateImage.validateImage,
                    },
                  ]}
                >
                  <Upload
                    listType="picture-card"
                    beforeUpload={() => false}
                    maxCount={1}
                    fileList={fileList}
                    onChange={handleChange}
                    accept=".png,.jpg,.jpeg"
                    showUploadList={{ showPreviewIcon: false }}
                  >
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                </Form.Item>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => handleCancel()}
                  className={
                    isButtonShow
                      ? 'border border-sky-500 px-10 text-sky-500 py-1 rounded-xl mr-1 mb-2 hover:shadow-sm hover:shadow-slate-600 hover:duration-150'
                      : 'border border-sky-500 px-10 text-sky-500 py-1 rounded-xl mr-1 mb-2 cursor-not-allowed'
                  }
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className={
                    isButtonShow
                      ? 'bg-sky-500 px-10 text-white py-1 rounded-xl ml-1 mb-2 hover:shadow-sm hover:shadow-black hover:duration-150'
                      : 'bg-sky-500 px-10 text-white py-1 rounded-xl ml-1 mb-2 cursor-not-allowed'
                  }
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
