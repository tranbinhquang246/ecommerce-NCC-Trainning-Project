/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

import {
  Form, Input, Select, InputNumber, Upload,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import validate from '../../validateForm/validatePrice';

function FormData(props) {
  const [brand, setBrand] = useState([]);
  const { category, brands, values } = props;
  const handleSelect = (_, value) => {
    setBrand(brands[value.key]);
  };
  const { TextArea } = Input;
  const { Option } = Select;

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onUploadChange = (e) => {
    console.log(e);
  };
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
        label="Danh mục sản phẩm"
        name="category"
        rules={[{ required: true, message: 'Hãy chọn một danh mục sản phẩm' }]}
      >
        <Select
          placeholder="Chọn danh mục sản phẩm"
          onSelect={(event, value) => handleSelect(event, value)}
        >
          {category?.map((element, index) => (
            <Option value={values[index]} key={index}>
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
        name="mainImg"
        label="Upload"
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
          onChange={onUploadChange}
          maxCount={1}
        >
          {uploadButton}
        </Upload>
      </Form.Item>
    </>
  );
}

export default FormData;
