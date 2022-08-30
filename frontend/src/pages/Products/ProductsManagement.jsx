import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import axios from '../../api/axios';
import ViewProduct from '../../components/ViewProducts/ViewProduct';
import ModalAdd from '../../components/Modal/ModalAdd';
import ModalSuccess from '../../components/Modal/ModalSuccess';
import Empty from '../Empty/Empty';
import ModalError from '../../components/Modal/ModalError';
import useLoading from '../../hooks/useLoading';

function ProductsManagement() {
  const [dataProducts, setDataProducts] = useState([]);
  const [idProduct, setIdProduct] = useState([]);
  const [isModalAddVisible, setIsModalAddVisible] = useState(false);
  const [isModalSuccessVisible, setIsModalSuccessVisible] = useState(false);
  const [isModalErrorVisible, setIsModalErrorVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const typingTimoutRef = useRef(null);
  const ruleAdmin = true;
  const [showLoading, hideLoading] = useLoading();
  const [action, setAction] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      showLoading();
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}products?category=${
            searchParams.get('category') || ''
          }&brand=${searchParams.get('brand') || ''}&page=${
            searchParams.get('page') || '1'
          }&searchWord=${searchParams.get('search') || ''}`,
        );
        setDataProducts(response);
      } catch (error) {
        console.error(error.message);
      } finally {
        hideLoading();
      }
    };
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    if (
      dataProducts.data?.length === 0
      && dataProducts?.totalPage < dataProducts?.currentPage
      && dataProducts?.totalPage !== 0
      && action === 'delete'
    ) {
      searchParams.set('page', dataProducts?.totalPage);
      setSearchParams(searchParams);
    }
  }, [dataProducts]);

  const handleChangeSearch = (e) => {
    const valueSearch = e.target.value;
    if (typingTimoutRef.current) {
      clearTimeout(typingTimoutRef.current);
    }
    typingTimoutRef.current = setTimeout(() => {
      searchParams.set('search', valueSearch);
      searchParams.set('page', '1');
      setSearchParams(searchParams);
    }, 500);
  };
  return (
    <div className="flex justify-center items-center w-full h-full bg-slate-200">
      <div className="flex flex-col w-[81%] mt-[38px] mb-[49px] ml-[94px] mr-[96px]">
        <div className="flex justify-between items-center w-full h-[48px] mb-[38px]">
          <button
            type="button"
            className=" hover:bg-[#00CCFF] hover:text-white text-[#00CCFF] py-[0.3rem] px-4 rounded-md border border-[#00CCFF]"
            onClick={() => setIsModalAddVisible(true)}
          >
            Thêm sản phẩm
          </button>
          <div className="flex justify-center items-center">
            <form className="flex items-center" onChange={handleChangeSearch}>
              <label htmlFor="simple-search">
                <div className="relative w-full">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <BsSearch />
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                    required
                    name="search"
                    defaultValue={searchParams.get('search') || ''}
                  />
                </div>
              </label>
            </form>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full min-h-[743px] bg-white pt-[46px] pb-[50px] pl-[56px] pr-[56px] rounded-md">
          {dataProducts.data?.length === 0 ? (
            <Empty />
          ) : (
            <ViewProduct
              dataProducts={dataProducts}
              setDataProducts={setDataProducts}
              ruleAdmin={ruleAdmin}
              setAction={setAction}
              setIsModalSuccessVisible={setIsModalSuccessVisible}
            />
          )}
        </div>
      </div>
      <ModalAdd
        setDataProducts={setDataProducts}
        isModalAddVisible={isModalAddVisible}
        setIsModalAddVisible={setIsModalAddVisible}
        setIsModalSuccessVisible={setIsModalSuccessVisible}
        setIsModalErrorVisible={setIsModalErrorVisible}
        setIdProduct={setIdProduct}
        setAction={setAction}
      />
      <ModalSuccess
        rule={action}
        idProduct={idProduct}
        isModalSuccessVisible={isModalSuccessVisible}
        setIsModalSuccessVisible={setIsModalSuccessVisible}
      />
      <ModalError
        isModalErrorVisible={isModalErrorVisible}
        setIsModalErrorVisible={setIsModalErrorVisible}
      />
    </div>
  );
}

export default ProductsManagement;
