/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { BsSearch } from 'react-icons/bs';

function Products() {
  const handleChangeSearch = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col w-10/12 h-divproduct">
        <div className="flex justify-end items-center w-full h-divsearch">
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
        <div className="flex justify-between items-center w-full h-full bg-slate-400 mt-5 rounded-md" />
      </div>
    </div>
  );
}

export default Products;
