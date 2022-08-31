/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import {
  Form, Input, Select, InputNumber,
} from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../api/axios';
import validatePrice from '../../validateForm/validatePrice';
import validateName from '../../validateForm/validateName';
import validateDescription from '../../validateForm/validateDescription';
import './index.css';

function FormData({ form }) {
  const [category, setCategory] = useState([]);
  const [valueCategory, setValueCategory] = useState([]);
  const [brands, setBrands] = useState([]);
  const [valueBrands, setValueBrands] = useState([]);
  const [brand, setBrand] = useState([]);
  const [valueBrand, setValueBrand] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let arrCategorys = [];
      let arrCategoryValues = [];
      let arrBrands = [];
      let arrBrandsValues = [];
      try {
        await axios
          .get(`${process.env.REACT_APP_API_URL}category`)
          .then((response) => {
            response[0].data?.forEach((element) => {
              arrCategorys = [...arrCategorys, element.categoryNames];
              arrCategoryValues = [...arrCategoryValues, element.categoryValues];
              arrBrands = [...arrBrands, element.brandNames];
              arrBrandsValues = [...arrBrandsValues, element.brandValues];
            });
          })
          .then(() => {
            setCategory(arrCategorys);
            setValueCategory(arrCategoryValues);
            setBrands(arrBrands);
            setValueBrands(arrBrandsValues);
          });
      } catch (error) {
        toast.error('Đã có lỗi xảy ra, không thể lấy category', {
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
    fetchData();
  }, []);
  const handleSelectCategory = (_, value) => {
    form.setFieldsValue({ brand: null });
    setBrand(brands[value.key]);
    setValueBrand(valueBrands[value.key]);
  };
  const { TextArea } = Input;
  const { Option } = Select;
  return (
    <>
      <Form.Item
        label="Tên sản phẩm"
        name="name"
        rules={[
          { required: true, message: 'Hãy điền tên sản phẩm' },
          {
            message: 'Không chứa các kí tự đặc biệt',
            validator: validateName.validateName,
          },
        ]}
        validateTrigger="onBlur"
      >
        <Input />
      </Form.Item>
      <Form.Item
        style={{ marginTop: '-5px' }}
        label="Danh mục sản phẩm"
        name="category"
        rules={[{ required: true, message: 'Hãy chọn một danh mục sản phẩm' }]}
      >
        <Select
          placeholder="Chọn danh mục sản phẩm"
          onSelect={(event, value) => handleSelectCategory(event, value)}
        >
          {category?.map((element, index) => (
            <Option value={valueCategory[index]} key={index}>
              {element}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        style={{ marginTop: '-5px' }}
        label="Hãng sản xuất"
        name="brand"
        rules={[{ required: true, message: 'Hãy chọn một danh mục sản phẩm' }]}
      >
        <Select placeholder="Chọn hãng sản xuất">
          {brand?.map((element, index) => (
            <Option value={valueBrand[index]} key={index}>
              {element}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        style={{ marginTop: '-5px' }}
        label="Giá"
        name="price"
        rules={[
          {
            required: true,
            message: 'Hãy điền giá sản phẩm',
          },
          {
            message: 'Tối thiểu 10000',
            validator: validatePrice.validatePriceMinimum,
          },
          {
            message: 'Tối đa 1000000000',
            validator: validatePrice.validatePriceMaximum,
          },
        ]}
        validateTrigger="onBlur"
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        style={{ marginTop: '-5px' }}
        label="Mô tả"
        name="description"
        rules={[
          {
            message: 'Không quá 500 kí tự',
            validator: validateDescription.validateDesciption,
          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>
    </>
  );
}

export default FormData;
