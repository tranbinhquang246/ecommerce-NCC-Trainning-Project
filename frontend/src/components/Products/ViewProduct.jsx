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
    <div className="flex flex-col w-full h-full bg-white mt-1">
      <div className="flex flex-wrap items-center justify-around w-full h-divproduct">
        {dataProducts.data?.map((element, index) => (
          <div
            className="flex flex-col basis-44 m-2 h-40 shadow-lg rounded-md bg-white"
            key={element._id}
          >
            <Link to={`/product/${element._id}`} className="w-full h-3/5">
              <img className="w-full h-full rounded-t-md" alt={index} src={element.mainImg} />
            </Link>
            <p className="font-medium ml-1 text-[15px] overflow-hidden">{element.name}</p>
            {ruleAdmin ? (
              <div className="flex -mt-2 ml-1 w-full justify-around">
                <button type="button" className="bg-green-500 w-2/6 h-6 mb-1 rounded-sm">
                  Cập nhật
                </button>
                <button
                  type="button"
                  className="bg-red-500 w-2/6 h-6 mb-1 rounded-sm"
                  onClick={(event) => handleClickDelete(event, element._id, element.name)}
                >
                  Xóa
                </button>
              </div>
            ) : (
              <p className="font-light -mt-2 ml-1 text-xs">$ {element.price}</p>
            )}
          </div>
        ))}
      </div>
      <div className=" w-full h-divsearch flex justify-center items-center">
        <PaginationPage totalPage={dataProducts.totalPage} currentPage={dataProducts.currentPage} />
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
        rule="del"
        isModalSuccessVisible={isModalSuccessVisible}
        setIsModalSuccessVisible={setIsModalSuccessVisible}
      />
    </div>
  );
}

export default ViewProduct;
