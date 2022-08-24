/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import CardItem from '../CardItem/CardItem';
import Carosel from '../Carosel/Carosel';
import useLoading from '../../hooks/useLoading';

function ProductDetail() {
  const location = useLocation();
  const [dataProduct, setDataProduct] = useState();
  const [dataRecommendProduct, setDataRecommendProduct] = useState();
  const navigate = useNavigate();
  const [showLoading, hideLoading] = useLoading();

  const handleClickReturn = () => {
    navigate(-1);
  };

  const idProduct = location.pathname.replace('/product/', '');
  useEffect(() => {
    const fetchData = async () => {
      showLoading();
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}products/${idProduct}`);
        setDataProduct(response);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error.message);
      } finally {
        hideLoading();
      }
    };
    fetchData();
  }, [location]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}products/recommend?category=${dataProduct?.brand}&brand=${dataProduct?.brand}`,
        );
        setDataRecommendProduct(response.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error.message);
      }
    };
    fetchData();
  }, [dataProduct]);
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col w-10/12 h-divproduct rounded-lg justify-around">
        <div className="flex items-center cursor-pointer">
          <AiOutlineArrowLeft />
          <label className="text-center ml-1 cursor-pointer" onClick={handleClickReturn}>
            Quay lại
          </label>
        </div>
        <div className="flex h-2/5 flex-wrap justify-center items-center">
          <div className="flex flex-col h-full w-3/6 pl-2">
            <strong className="text-sm">{dataProduct?.name}</strong>
            <div className="flex mt-2">
              <strong>Danh mục: </strong>
              &nbsp;
              <label>{dataProduct?.category}</label>
            </div>
            <div className="flex mt-1">
              <strong>Hãng sản xuất: </strong>
              &nbsp;
              <label>{dataProduct?.brand}</label>
            </div>
            <div className="flex mt-1">
              <strong>Giá sản phẩm: </strong>
              &nbsp;
              <label>$</label>
              &nbsp;
              <label>{dataProduct?.price}</label>
            </div>
            <div className="flex flex-col overflow-y-scroll overflow-x-hidden mt-1">
              <strong>Mô tả sản phẩm: </strong>
              <p>{dataProduct?.description}</p>
            </div>
          </div>
          <div className="h-full w-3/6 pl-2">
            <Carosel mainImg={dataProduct?.mainImg} slidesImg={[dataProduct?.slidesImg]} />
          </div>
        </div>
        <div className="font-bold">Gợi ý cho bạn</div>
        <div className="flex h-2/5">
          {dataRecommendProduct?.map((element, index) => (
            <CardItem element={element} index={index} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
