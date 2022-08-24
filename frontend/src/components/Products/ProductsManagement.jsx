/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import axios from '../../api/axios';
import ViewProduct from './ViewProduct';
import ModalAdd from '../Modal/ModalAdd';
import ModalSuccess from '../Modal/ModalSuccess';
import Empty from '../Empty/Empty';
import ModalError from '../Modal/ModalError';
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
        // eslint-disable-next-line no-console
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
      setSearchParams(searchParams);
    }, 500);
  };
  return (
    <div className="w-full">
      <div className="flex justify-center items-center w-full h-full">
        <div className="flex flex-col w-10/12 h-divproduct">
          <div className="flex justify-between items-center w-full h-divsearch">
            <button
              type="button"
              className=" hover:bg-[#00CCFF] hover:text-white text-[#00CCFF] py-[0.3rem] px-4 rounded-md border border-[#00CCFF]"
              onClick={() => setIsModalAddVisible(true)}
            >
              Thêm sản phẩm
            </button>
            <div className="flex justify-center items-center">
              <form className="flex items-center" onChange={handleChangeSearch}>
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
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
              </form>
            </div>
          </div>
          {dataProducts.data?.length === 0 ? (
            <Empty />
          ) : (
            <ViewProduct
              dataProducts={dataProducts}
              setDataProducts={setDataProducts}
              ruleAdmin={ruleAdmin}
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
      />
      <ModalSuccess
        rule="add"
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
