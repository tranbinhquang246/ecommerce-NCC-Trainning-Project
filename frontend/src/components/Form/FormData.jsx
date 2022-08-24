/* eslint-disable array-callback-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import {
  Form, Input, Select, InputNumber,
} from 'antd';
import axios from '../../api/axios';
import validate from '../../validateForm/validatePrice';

function FormData({ form }) {
  const [category, setCategory] = useState([]);
  const [values, setValues] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState([]);
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
          setValues(arrValue);
          setBrands(arrBrands);
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  const handleSelectCategory = (_, value) => {
    form.setFieldsValue({ brand: null });
    setBrand(brands[value.key]);
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
            validator: validate.validateName,
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
            <Option value={values[index]} key={index}>
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
            <Option value={element.toLowerCase()} key={index}>
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
            validator: validate.validatePriceMinimum,
          },
          {
            message: 'Tối đa 1000000000',
            validator: validate.validatePriceMaximum,
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
            validator: validate.validateDesciption,
          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>
    </>
  );
}

export default FormData;
