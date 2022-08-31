import React, {
  useEffect, useRef, useState, useContext,
} from 'react';
import { Input } from 'antd';
import { BsSearch } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import ViewProduct from '../../components/ViewProducts/ViewProduct';
import Empty from '../../components/Empty/Empty';
import useLoading from '../../hooks/useLoading';
import { DisableMenuContext } from '../../layout/MainLayout';
import 'react-toastify/dist/ReactToastify.css';

function Products() {
  const [dataProducts, setDataProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showLoading, hideLoading] = useLoading();
  const [searchKeyWord, setSearchKeyWord] = useState(searchParams.get('search'));
  const ruleAdmin = false;
  const typingTimoutRef = useRef(null);
  const { setIsDisableContext } = useContext(DisableMenuContext);

  useEffect(() => {
    const fetchData = async () => {
      showLoading();
      setIsDisableContext(false);
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
        toast.error('Đã có lỗi xảy ra', {
          position: 'top-right',
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
  }, [searchParams]);

  const handleChangeSearch = (e) => {
    const valueSearch = e.target.value.replace(/[^a-z 0-9]/gi, '').trimStart();
    setSearchKeyWord(valueSearch);
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
    <div className="flex justify-center items-center w-full h-full bg-slate-200">
      <div className="flex flex-col w-[81%] mt-[38px] mb-[49px] ml-[94px] mr-[96px]">
        <div className="flex justify-end items-center w-full h-[48px] mb-[38px]">
          <div className="w-1/3">
            <Input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
              name="search"
              value={searchKeyWord}
              onChange={handleChangeSearch}
              prefix={<BsSearch />}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full bg-white pt-[46px] pb-[50px] pl-[56px] pr-[56px] rounded-md">
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
