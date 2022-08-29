import React from 'react';
import { Modal } from 'antd';
import ErrorIcon from '../../assets/error.png';

function ModalError({ isModalErrorVisible, setIsModalErrorVisible }) {
  const handleOk = () => {
    setIsModalErrorVisible(false);
  };

  const handleCancel = () => {
    setIsModalErrorVisible(false);
  };

  return (
    <Modal visible={isModalErrorVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
      <div className="flex flex-col justify-center items-center mt-10 mb-5">
        <img src={ErrorIcon} alt="erroricon" className="w-1/5" />
        <div className="flex mt-7 text-xs">
          <strong className="text-base">Đã có lỗi xảy ra, hãy thử lại</strong>
        </div>
      </div>
    </Modal>
  );
}

export default ModalError;
