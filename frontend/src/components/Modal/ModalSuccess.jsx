import React from 'react';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '../../assets/deleteIcon.png';
import SusscessIcon from '../../assets/successIcon.png';

function ModalSuccess(props) {
  const {
    rule, idProduct, isModalSuccessVisible, setIsModalSuccessVisible,
  } = props;
  const navigate = useNavigate();

  const handleAddOk = () => {
    navigate(`/product/${idProduct}`);
    setIsModalSuccessVisible(false);
  };
  const handleUpdateOk = () => {};
  const handleDeleteOk = async () => {
    setIsModalSuccessVisible(false);
  };
  if (rule === 'add') {
    return (
      <Modal
        visible={isModalSuccessVisible}
        onOk={handleAddOk}
        onCancel={handleAddOk}
        footer={null}
      >
        <div className="flex flex-col justify-center items-center mt-10 mb-5">
          <img src={SusscessIcon} alt="deleteicon" className="w-1/5" />
          <div className="flex mt-7 text-xs">
            <strong className="text-base">Thêm sản phẩm thành công</strong>
          </div>
        </div>
      </Modal>
    );
  }
  if (rule === 'update') {
    return (
      <Modal
        visible={isModalSuccessVisible}
        onOk={handleUpdateOk}
        onCancel={handleUpdateOk}
        footer={null}
      >
        <div className="flex flex-col justify-center items-center mt-10 mb-5">
          <img src={SusscessIcon} alt="deleteicon" className="w-1/5" />
          <div className="flex mt-7 text-xs">
            <strong className="text-base">Cập nhật sản phẩm thành công</strong>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      visible={isModalSuccessVisible}
      onOk={handleDeleteOk}
      onCancel={handleDeleteOk}
      footer={null}
    >
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
