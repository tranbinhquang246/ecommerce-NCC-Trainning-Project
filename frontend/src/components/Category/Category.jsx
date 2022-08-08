/* eslint-disable no-unused-vars */
/* eslint-disable prefer-spread */
/* eslint-disable no-shadow */
/* eslint-disable array-callback-return */
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

function Category() {
  const [category, setCategory] = useState([]);
  const [valueCategory, setValueCategory] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      let arrCategory = ['Tất cả'];
      let arrValueCategory = [''];
      let arrBrands = [];
      let allBrands = [];
      try {
        const response = await axios.get('http://localhost:5000/dropdown');
        response.data.data[0].data?.map((element) => {
          arrCategory = [...arrCategory, element.categoryName];
          arrValueCategory = [...arrValueCategory, element.value];
          arrBrands = [...arrBrands, element.brand];
          setCategory(arrCategory);
          setValueCategory(arrValueCategory);
          setBrands(arrBrands);
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error.message);
      }
      allBrands = [].concat.apply([], arrBrands);
      arrBrands = [allBrands, ...arrBrands];
      setBrands(arrBrands?.map((element) => ['Tất cả', ...element]));
    };
    setBrand(brands[0]);
    fetchData();
  }, []);

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const itemsCategory = [
    getItem(
      'Danh mục',
      'category',
      null,
      category?.map((element, index) => getItem(element, valueCategory[index])),
    ),
  ];

  const itemsBrand = [
    getItem(
      'Hãng',
      'brand',
      null,
      brand?.map((element) => getItem(element, element.toLowerCase())),
    ),
  ];
  const onClickCategory = (e) => {
    const brandParam = searchParams.get('brand') || '';
    const pageParam = searchParams.get('page') || '';
    setBrand(brands[valueCategory.indexOf(e.key)]);
    searchParams.set('category', e.key);
    searchParams.set('brand', brandParam);
    searchParams.set('page', pageParam);

    setSearchParams(searchParams);
  };
  const onClickBrand = (e) => {
    const categoryParam = searchParams.get('category') || '';
    const pageParam = searchParams.get('page') || '';
    if (e.key === 'tất cả') {
      searchParams.set('category', categoryParam);
      searchParams.set('brand', '');
      searchParams.set('page', pageParam);
      setSearchParams(searchParams);
    } else {
      searchParams.set('category', categoryParam);
      searchParams.set('brand', e.key);
      searchParams.set('page', pageParam);
      setSearchParams(searchParams);
    }
  };

  return (
    <div className="h-full w-divlogo overflow-scroll">
      <Menu
        onClick={onClickCategory}
        style={{
          width: '100%',
          fontWeight: 'bold',
        }}
        defaultSelectedKeys={['']}
        defaultOpenKeys={['category']}
        mode="inline"
        items={itemsCategory}
      />
      <Menu
        onClick={onClickBrand}
        style={{
          width: '100%',
          fontWeight: 'bold',
        }}
        defaultSelectedKeys={['0']}
        defaultOpenKeys={['brand']}
        mode="inline"
        items={itemsBrand}
      />
    </div>
  );
}

export default Category;
