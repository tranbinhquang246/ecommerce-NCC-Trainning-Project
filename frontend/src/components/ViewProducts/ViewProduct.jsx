/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import ModalCautionDelete from '../Modal/ModalCautionDelete';
import PaginationPage from '../Pagination/PaginationPage';
import CardItem from '../CardItem/CardItem';

function ViewProduct(props) {
  const {
    dataProducts, setDataProducts, ruleAdmin, setAction, setIsModalSuccessVisible,
  } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idProduct, setIdProduct] = useState();
  const [nameProduct, setNameProduct] = useState();

  return (
    <>
      <div className="w-full">
        <div
          className="grid w-full h-full gap-x-3 gap-y-5 min-h-[550px] justify-items-center"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(255px, 1fr))' }}
        >
          {dataProducts.data?.map((element, index) => (
            <CardItem
              ruleAdmin={ruleAdmin}
              element={element}
              index={index}
              setIsModalVisible={setIsModalVisible}
              setIdProduct={setIdProduct}
              setNameProduct={setNameProduct}
              key={Math.random()}
            />
          ))}
        </div>
      </div>
      <div className="w-full h-[44px] flex justify-center items-center mt-[36px]">
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
        setAction={setAction}
      />
    </>
  );
}

export default ViewProduct;
