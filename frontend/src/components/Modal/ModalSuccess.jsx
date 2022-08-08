/* eslint-disable react/prop-types */
import React from 'react';
import { Modal } from 'antd';
import DeleteIcon from '../../assets/deleteIcon.png';
import SusscessIcon from '../../assets/successIcon.png';

function ModalSuccess(props) {
  const { rule, isModalSuccessVisible, setIsModalSuccessVisible } = props;

  const handleOk = () => {
    setIsModalSuccessVisible(false);
  };

  const handleCancel = () => {
    setIsModalSuccessVisible(false);
  };
  if (rule === 'add') {
    return (
      <Modal visible={isModalSuccessVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <div className="flex flex-col justify-center items-center mt-10 mb-5">
          <img src={SusscessIcon} alt="deleteicon" className="w-1/5" />
          <div className="flex mt-7 text-xs">
            <strong className="text-base">Thêm sản phẩm thành công</strong>
          </div>
        </div>
      </Modal>
    );
  }
  return (
    <Modal visible={isModalSuccessVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
      <div className="flex flex-col justify-center items-center mt-10 mb-5">
        <img src={DeleteIcon} alt="deleteicon" className="w-1/5" />
        <div className="flex mt-7 text-xs">
          <strong className="text-base">Xóa sản phẩm thành công!</strong>
        </div>
      </div>
    </Modal>
  );
}

export default ModalSuccess;
