/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import axios from '../../api/axios';
import ViewProduct from './ViewProduct';
import ModalAdd from '../Modal/ModalAdd';
import ModalSuccess from '../Modal/ModalSuccess';

function ProductsManagement() {
  const [dataProducts, setDataProducts] = useState([]);
  const [isModalAddVisible, setIsModalAddVisible] = useState(false);
  const [isModalSuccessVisible, setIsModalSuccessVisible] = useState(false);
  const [searchParams] = useSearchParams();
  const ruleAdmin = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}products?category=${
            searchParams.get('category') || ''
          }&brand=${searchParams.get('brand') || ''}&page=${searchParams.get('page') || '1'}`,
        );
        setDataProducts(response);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error.message);
      }
    };
    fetchData();
  }, [searchParams]);

  const handleChangeSearch = (e) => {
    console.log(e.target.value);
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
                    name="searchWord"
                  />
                </div>
              </form>
            </div>
          </div>
          <ViewProduct
            dataProducts={dataProducts}
            setDataProducts={setDataProducts}
            ruleAdmin={ruleAdmin}
          />
        </div>
      </div>
      <ModalAdd
        setDataProducts={setDataProducts}
        isModalAddVisible={isModalAddVisible}
        setIsModalAddVisible={setIsModalAddVisible}
        setIsModalSuccessVisible={setIsModalSuccessVisible}
      />
      <ModalSuccess
        rule="add"
        isModalSuccessVisible={isModalSuccessVisible}
        setIsModalSuccessVisible={setIsModalSuccessVisible}
      />
    </div>
  );
}

export default ProductsManagement;
