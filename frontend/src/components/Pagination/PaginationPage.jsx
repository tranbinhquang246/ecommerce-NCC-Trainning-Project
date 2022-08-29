import React from 'react';
import { Pagination } from 'antd';
import { useSearchParams } from 'react-router-dom';

function PaginationPage(props) {
  const { totalPage, currentPage } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChangePaginations = (page) => {
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
