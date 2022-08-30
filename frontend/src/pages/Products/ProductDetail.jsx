import React, { useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import CardItem from '../../components/CardItem/CardItem';
import Carosel from '../../components/Carosel/Carosel';
import useLoading from '../../hooks/useLoading';
import './productDetail.css';

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
          `${process.env.REACT_APP_API_URL}products/recommend?category=${dataProduct?.valueCategory}&brand=${dataProduct?.valueBrand}`,
        );
        setDataRecommendProduct(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [dataProduct]);
  return (
    <div className="flex justify-center items-center w-full h-full bg-slate-200">
      <div className="flex flex-col w-[81%] mt-[38px] mb-[8%] ml-[94px] mr-[8%] bg-white p-[32px]">
        <div className="flex items-center cursor-pointer w-full h-[26px]">
          <AiOutlineArrowLeft />
          <button
            type="button"
            className="text-center ml-1 cursor-pointer"
            onClick={handleClickReturn}
          >
            Quay lại
          </button>
        </div>
        <div className="grid gird-cols-1 lg:grid-cols-2 w-full min-h-[316px]">
          <div className="flex flex-col h-full w-full p-2 min-h-[316px]">
            <div className="flex w-full h-[10%] bg-slate-200 rounded-t-md">
              <div className="flex justify-start items-center w-1/3 h-full pl-5">Tên sản phẩm</div>
              <div className="flex justify-center items-center w-2/3 h-full font-bold overflow-hidden whitespace-nowrap text-ellipsis">
                {dataProduct?.name}
              </div>
            </div>
            <div className="flex w-full h-[10%]">
              <div className="flex justify-start items-center w-1/3 h-full pl-5">Danh mục</div>
              <div className="flex justify-center items-center w-2/3 h-full font-bold">
                {dataProduct?.category}
              </div>
            </div>
            <div className="flex w-full h-[10%] bg-slate-200">
              <div className="flex justify-start items-center w-1/3 h-full pl-5">Hãng sản xuất</div>
              <div className="flex justify-center items-center w-2/3 h-full font-bold">
                {dataProduct?.brand}
              </div>
            </div>
            <div className="flex w-full h-[10%]">
              <div className="flex justify-start items-center w-1/3 h-full pl-5">Giá sản phẩm</div>
              <div className="flex justify-center items-center w-2/3 h-full font-bold">
                $ {dataProduct?.price}
              </div>
            </div>
            <div className="flex w-full h-[60%] bg-slate-200 rounded-b-md">
              <div className="flex justify-start items-center w-1/3 h-full pl-5">
                Mô tả sản phẩm
              </div>
              <div className="flex justify-start items-center w-2/3 h-full pl-2 pr-2 overflow-y-scroll overflow-x-hidden">
                {dataProduct?.description}
              </div>
            </div>
          </div>
          <div className="h-full w-full pl-2 max-h-[316px]">
            <Carosel mainImg={dataProduct?.mainImg} slidesImg={[dataProduct?.slidesImg]} />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <h5>Gợi ý cho bạn</h5>
          <div
            className="grid gap-x-3 gap-y-5 w-full h-[95%]"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(245px, 1fr))' }}
          >
            {dataRecommendProduct?.map((element, index) => (
              <CardItem ruleAdmin={false} element={element} index={index} key={Math.random()} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
