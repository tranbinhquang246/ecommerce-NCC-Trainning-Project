/* eslint-disable no-unused-vars */
import React from 'react';
import { Modal } from 'antd';
import { useSearchParams } from 'react-router-dom';
import DeleteIcon from '../../assets/deleteIcon.png';
import axios from '../../api/axios';

function ModalCautionDelete(props) {
  const {
    setDataProducts,
    isModalVisible,
    setIsModalVisible,
    setIsModalSuccessVisible,
    idProduct,
    nameProduct,
    setAction,
  } = props;
  const [searchParams] = useSearchParams();
  const handleOk = async () => {
    await axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}products/${idProduct}`,
    }).then(async (response) => {
      if (response) {
        const dataProducts = await axios.get(
          `${process.env.REACT_APP_API_URL}products?category=${
            searchParams.get('category') || ''
          }&brand=${searchParams.get('brand') || ''}&page=${
            searchParams.get('page') || '1'
          }&searchWord=${searchParams.get('search') || ''}`,
        );
        setDataProducts(dataProducts);
        setAction('delete');
        setIsModalVisible(false);
        setIsModalSuccessVisible(true);
      }
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
      <div className="flex flex-col justify-center items-center mt-10 mb-5">
        <img src={DeleteIcon} alt="deleteicon" className="w-1/5" />
        <div className="flex mt-5 text-xs">
          <p>Bạn có chắc chắn muốn xóa sản phẩm </p>
          &nbsp;
          <p className="text-red-500">{nameProduct}</p>
        </div>
        <div className="flex text-xs">
          <p>Sản phẩm sẽ bị </p>
          &nbsp;
          <p className="text-red-500">xóa vĩnh viễn</p>
        </div>
        <div className="flex justify-center w-full mt-2">
          <button
            onClick={handleCancel}
            type="button"
            className="border border-black pl-12 pr-12 pt-1 pb-1 rounded-2xl mr-1"
          >
            Hủy
          </button>
          <button
            onClick={handleOk}
            type="button"
            className="bg-red-500 pl-12 pr-12 pt-1 pb-1 rounded-2xl ml-1 text-white"
          >
            Xóa
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalCautionDelete;
