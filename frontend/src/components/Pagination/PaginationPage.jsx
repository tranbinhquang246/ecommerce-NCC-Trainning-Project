/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Pagination } from 'antd';
import { useSearchParams } from 'react-router-dom';

function PaginationPage(props) {
  const { totalPage, currentPage } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChangePaginations = (page) => {
    const brandParam = searchParams.get('brand') || '';
    const categoryParam = searchParams.get('category') || '';
    const searchParam = searchParams.get('search') || '';
    searchParams.set('brand', brandParam);
    searchParams.set('category', categoryParam);
    searchParams.set('search', searchParam);
    searchParams.set('page', page);
    setSearchParams(searchParams);
  };
  if (totalPage !== undefined && currentPage !== undefined) {
    return (
      <Pagination
        defaultCurrent={currentPage}
        total={totalPage * 10}
        onChange={handleChangePaginations}
      />
    );
  }
}

export default PaginationPage;
