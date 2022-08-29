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
    <div className="flex justify-center items-center w-[81.3%] h-full bg-slate-200">
      <div className="flex flex-col w-[83.8%] h-[88.8%] rounded-lg justify-around bg-white pr-[4.7%] pl-[4.7%] pt-[2.7%] pb-[4.2%]">
        <div className="flex items-center cursor-pointer w-full h-[5%]">
          <AiOutlineArrowLeft />
          <button
            type="button"
            className="text-center ml-1 cursor-pointer"
            onClick={handleClickReturn}
          >
            Quay lại
          </button>
        </div>
        <div className="flex h-[50%] flex-wrap justify-center items-center">
          <div className="flex flex-col h-full w-3/6 p-2">
            <table>
              <tr>
                <th>Tên sản phẩm</th>
                <td className="font-bold">{dataProduct?.name}</td>
              </tr>
              <tr>
                <th>Danh mục</th>
                <td>{dataProduct?.category}</td>
              </tr>
              <tr>
                <th>Hãng sản xuất</th>
                <td>{dataProduct?.brand}</td>
              </tr>
              <tr>
                <th>Giá sản phẩm</th>
                <td>$ {dataProduct?.price}</td>
              </tr>
              <tr>
                <th>Mô tả sản phẩm</th>
                <td className=" h-[40%]">
                  <div className="w-full h-full overflow-y-auto overflow-x-hidden text-left pl-1 break-all">
                    {dataProduct?.description}
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div className="h-full w-3/6 pl-2">
            <Carosel mainImg={dataProduct?.mainImg} slidesImg={[dataProduct?.slidesImg]} />
          </div>
        </div>
        <div className="flex flex-col w-full h-[45%]">
          <h5>Gợi ý cho bạn</h5>
          <div className="grid grid-cols-3 grid-rows-1 w-full h-[95%] gap-6">
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
