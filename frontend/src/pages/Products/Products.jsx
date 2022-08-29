import React, { useEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';
import axios from '../../api/axios';
import ViewProduct from './ViewProduct';
import Empty from '../Empty/Empty';
import useLoading from '../../hooks/useLoading';

function Products() {
  const [dataProducts, setDataProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showLoading, hideLoading] = useLoading();
  const [message, setMessage] = useState(searchParams.get('search'));
  const ruleAdmin = false;
  const typingTimoutRef = useRef(null);

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

  const handleChangeSearch = (e) => {
    const valueSearch = e.target.value.replace(/[^a-z ]/gi, '');
    setMessage(valueSearch);
    if (typingTimoutRef.current) {
      clearTimeout(typingTimoutRef.current);
    }
    typingTimoutRef.current = setTimeout(() => {
      searchParams.set('search', valueSearch);
      searchParams.set('page', '1');
      setSearchParams(searchParams);
    }, 1000);
  };
  return (
    <div className="flex justify-center items-center w-[81.3%] h-full bg-slate-200">
      <div className="flex flex-col w-[83.7%] h-divproduct">
        <div className="flex justify-end items-center w-full h-[10%]">
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
                  name="search"
                  value={message}
                />
              </div>
            </label>
          </form>
        </div>
        <div className="flex justify-center items-center w-full h-[90%]">
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
    </div>
  );
}

export default Products;
