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
import {
  Form, Input, Select, Upload, Modal, InputNumber,
} from 'antd';
import { RiCloseCircleFill } from 'react-icons/ri';
import { PlusOutlined } from '@ant-design/icons';
import validate from '../../validateForm/validatePrice';

const getBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => resolve(reader.result);

  reader.onerror = (error) => reject(error);
});

function ModaAdd({ setOpenModalAdd }) {
  const [category, setCategory] = useState([]);
  const [value, setValue] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [titleButtonUpload, setTitleButtonUpload] = useState('Upload');

  useEffect(() => {
    const fetchData = async () => {
      let arrCategory = [];
      let arrValue = [];
      let arrBrands = [];
      try {
        const response = await axios.get('http://localhost:5000/dropdown');
        // eslint-disable-next-line array-callback-return
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
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleCancel = () => setPreviewVisible(false);

  const handleSelect = (_, value) => {
    setBrand(brands[value.key]);
  };
  const { TextArea } = Input;
  const { Option } = Select;
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const handleChange = (e) => {
    if (e.fileList.length === 0) {
      setTitleButtonUpload('Upload');
    } else {
      setTitleButtonUpload('Update');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
              //   initialValues={{
              //     price: 100000,
              //   }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Tên sản phẩm"
                name="name"
                rules={[
                  { required: true, message: 'Hãy điền tên sản phẩm' },
                  {
                    message: 'Không chứa các kí tự đặc biệt',
                    validator: validate.validateName,
                  },
                ]}
                validateTrigger="onBlur"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Danh mục sản phẩm"
                name="category"
                rules={[{ required: true, message: 'Hãy chọn một danh mục sản phẩm' }]}
              >
                <Select
                  placeholder="Chọn danh mục sản phẩm"
                  onSelect={(event, value) => handleSelect(event, value)}
                >
                  {category?.map((element, index) => (
                    <Option value={value[index]} key={index}>
                      {element}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Hãng sản xuất"
                name="brand"
                rules={[{ required: true, message: 'Hãy chọn một danh mục sản phẩm' }]}
              >
                <Select placeholder="Chọn hãng sản xuất">
                  {brand?.map((element, index) => (
                    <Option value={element.toLowerCase()} key={index}>
                      {element}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Price"
                name="price"
                rules={[
                  {
                    required: true,
                    message: 'Hãy điền tên sản phẩm',
                  },
                  {
                    message: 'Tối thiểu 10000',
                    validator: validate.validatePriceMinimum,
                  },
                  {
                    message: 'Tối đa 1000000000',
                    validator: validate.validatePriceMaximum,
                  },
                  {
                    message: 'Không được phép nhập số âm',
                    validator: validate.validatePriceNegative,
                  },
                ]}
                validateTrigger="onBlur"
              >
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                label="Mô tả"
                name="description"
                rules={[
                  {
                    message: 'Không quá 500 kí tự',
                    validator: validate.validateDesciption,
                  },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item
                name="upload"
                label="Upload"
                valuePropName="mainImg"
                getValueFromEvent={normFile}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn 1 bức ảnh',
                  },
                ]}
              >
                <Upload
                  listType="picture-card"
                  beforeUpload={() => false}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  accept=".jpg, .jpeg, .png"
                  maxCount={1}
                >
                  <div>
                    <PlusOutlined />
                    <div
                      style={{
                        marginTop: 8,
                      }}
                    >
                      {titleButtonUpload}
                    </div>
                  </div>
                </Upload>
              </Form.Item>
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
              <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{
                    width: '100%',
                  }}
                  src={previewImage}
                />
              </Modal>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModaAdd;
