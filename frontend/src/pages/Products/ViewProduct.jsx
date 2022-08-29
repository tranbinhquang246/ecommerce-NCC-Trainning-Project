import React, { useState } from 'react';
import ModalCautionDelete from '../../components/Modal/ModalCautionDelete';
import PaginationPage from '../../components/Pagination/PaginationPage';
import CardItem from '../../components/CardItem/CardItem';

function ViewProduct(props) {
  const {
    dataProducts, setDataProducts, ruleAdmin, setAction, setIsModalSuccessVisible,
  } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idProduct, setIdProduct] = useState();
  const [nameProduct, setNameProduct] = useState();

  return (
    <div className="flex flex-col w-full h-full bg-white pt-5 pb-5 pl-10 pr-10">
      <div className="grid gap-x-10 gap-y-4 w-full h-divproduct grid-cols-2 grid-rows-3 lg:grid-cols-3 lg:grid-rows-2">
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
      <div className=" w-full h-divsearch flex justify-center items-center mt-3">
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
    </div>
  );
}

export default ViewProduct;
