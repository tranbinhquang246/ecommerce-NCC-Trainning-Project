/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalCautionDelete from '../Modal/ModalCautionDelete';
import ModalSuccess from '../Modal/ModalSuccess';
import PaginationPage from '../Pagination/PaginationPage';
import CardItem from '../CardItem/CardItem';

function ViewProduct(props) {
  const { dataProducts, setDataProducts, ruleAdmin } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalSuccessVisible, setIsModalSuccessVisible] = useState(false);
  const [idProduct, setIdProduct] = useState();
  const [nameProduct, setNameProduct] = useState();
  const handleClickDelete = (event, id, name) => {
    setIdProduct(id);
    setNameProduct(name);
    setIsModalVisible(true);
  };

  return (
    <div className="flex flex-col w-full h-full bg-white p-5">
      <div className="grid grid-cols-2 grid-row-3 gap-4 w-full h-divproduct lg:grid-cols-3 lg:grid-rows-2">
        {dataProducts.data?.map((element, index) => (
          <CardItem ruleAdmin={ruleAdmin} element={element} index={index} key={index} />
        ))}
      </div>
      <div className=" w-full h-divsearch flex justify-center items-center">
        <PaginationPage
          totalPage={dataProducts?.totalPage}
          currentPage={dataProducts?.currentPage}
        />
      </div>
      <ModalCautionDelete
        setDataProducts={setDataProducts}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setIsModalSuccessVisible={setIsModalSuccessVisible}
        idProduct={idProduct}
        nameProduct={nameProduct}
      />
      <ModalSuccess
        rule="delete"
        isModalSuccessVisible={isModalSuccessVisible}
        setIsModalSuccessVisible={setIsModalSuccessVisible}
      />
    </div>
  );
}

export default ViewProduct;
