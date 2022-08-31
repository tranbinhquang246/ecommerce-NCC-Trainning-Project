import React, { useEffect, useState, useContext } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DisableMenuContext } from '../../layout/MainLayout';
import axios from '../../api/axios';
import CardItem from '../../components/CardItem/CardItem';
import Carosel from '../../components/Carosel/Carosel';
import useLoading from '../../hooks/useLoading';
import 'react-toastify/dist/ReactToastify.css';

function ProductDetail() {
  const location = useLocation();
  const { setIsDisableContext } = useContext(DisableMenuContext);
  const [dataProduct, setDataProduct] = useState();
  const [dataRecommendProduct, setDataRecommendProduct] = useState();
  const navigate = useNavigate();
  const [showLoading, hideLoading] = useLoading();

  const handleClickReturn = () => {
    navigate(-1);
  };
  const idProduct = location.pathname.replace('/product/', '');
  useEffect(() => {
    setIsDisableContext(true);
    const fetchData = async () => {
      showLoading();
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}products/${idProduct}`);
        setDataProduct(response);
      } catch (error) {
        toast.error('Không thể lấy thông tin sản phẩm', {
          position: 'bottom-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        hideLoading();
      }
    };
    fetchData();
  }, [location]);
  useEffect(() => {
    const fetchData = async () => {
      if (dataProduct) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}products/recommend?category=${dataProduct?.category}&brand=${dataProduct?.brand}`,
          );
          setDataRecommendProduct(response.data);
        } catch (error) {
          toast.error('Không thể lấy sản phẩm đề xuẩt', {
            position: 'bottom-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
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
          <div className="flex flex-col h-full w-full p-2 max-h-[316px]">
            <div className="flex w-full h-[10%] bg-slate-200 rounded-t-md">
              <div className="flex justify-start items-center w-1/3 h-full pl-5">Tên sản phẩm</div>
              <h5 className="font-medium w-2/3 ml-5 text-[15px] text-[#171B2F] overflow-hidden whitespace-nowrap text-ellipsis">
                {dataProduct?.name}
              </h5>
            </div>
            <div className="flex w-full h-[10%]">
              <div className="flex justify-start items-center w-1/3 h-full pl-5">Danh mục</div>
              <h5 className="font-medium w-2/3 ml-5 text-[15px] text-[#171B2F] overflow-hidden whitespace-nowrap text-ellipsis">
                {dataProduct?.categoryName}
              </h5>
            </div>
            <div className="flex w-full h-[10%] bg-slate-200">
              <div className="flex justify-start items-center w-1/3 h-full pl-5">Hãng sản xuất</div>
              <h5 className="font-medium w-2/3 ml-5 text-[15px] text-[#171B2F] overflow-hidden whitespace-nowrap text-ellipsis">
                {dataProduct?.brandName}
              </h5>
            </div>
            <div className="flex w-full h-[10%]">
              <div className="flex justify-start items-center w-1/3 h-full pl-5">Giá sản phẩm</div>
              <h5 className="font-medium w-2/3 ml-5 text-[15px] text-[#171B2F] overflow-hidden whitespace-nowrap text-ellipsis">
                $ {dataProduct?.price}
              </h5>
            </div>
            <div className="flex w-full h-[60%] bg-slate-200 rounded-b-md">
              <div className="flex justify-start items-center w-1/3 h-full pl-5">
                Mô tả sản phẩm
              </div>
              <div className="flex justify-start items-center w-2/3 h-full pl-2 pt-2 pb-2">
                <div className="w-full h-full overflow-y-scroll overflow-x-hidden">
                  {dataProduct?.description}
                </div>
              </div>
            </div>
          </div>
          <div className="h-full w-full pl-2 max-h-[316px] pt-2">
            <Carosel mainImg={dataProduct?.mainImg} slidesImg={[dataProduct?.slidesImg]} />
          </div>
        </div>
        <div className="flex flex-col w-full mt-5">
          <h5>Gợi ý cho bạn</h5>
          <div
            className="grid gap-x-3 gap-y-5 w-full h-[95%] justify-items-center"
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
