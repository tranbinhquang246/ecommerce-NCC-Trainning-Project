/* eslint-disable no-unused-vars */
/* eslint-disable prefer-spread */
/* eslint-disable no-shadow */
/* eslint-disable array-callback-return */
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import useLoading from '../../hooks/useLoading';

function Category() {
  const [showLoading, hideLoading] = useLoading();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [valueCategory, setValueCategory] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState([]);
  const [defaultSelectCategory, setDefaultSelectCategory] = useState();
  const [defaultSelectBrand, setDefaultSelectBrand] = useState();

  useEffect(() => {
    let arrCategory = ['Tất cả'];
    let arrValueCategory = [''];
    let arrBrands = [];
    let allBrands = [];
    const fetchData = async () => {
      showLoading();
      try {
        const response = await axios.get('http://localhost:5000/dropdown');
        response.data[0].data?.map((element) => {
          arrCategory = [...arrCategory, element.categoryName];
          arrValueCategory = [...arrValueCategory, element.value];
          arrBrands = [...arrBrands, element.brand];
        });
        setCategory(arrCategory);
        setValueCategory(arrValueCategory);
        setBrands(arrBrands);
        allBrands = [].concat.apply([], arrBrands);
        arrBrands = [allBrands, ...arrBrands];
        setBrands(arrBrands?.map((element) => ['Tất cả', ...element]));
      } catch (error) {
        console.error(error.message);
      } finally {
        hideLoading();
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (searchParams.get('category') === null || searchParams.get('category') === '') {
      setBrand(brands[0]);
    } else if (searchParams.get('category') === 'xemay') {
      setBrand(brands[1]);
    } else if (searchParams.get('category') === 'xedap') {
      setBrand(brands[2]);
    } else {
      setBrand(brands[3]);
    }
  }, [brands]);
  useEffect(() => {
    if (searchParams.get('category') === null && searchParams.get('brand') === null) {
      setDefaultSelectCategory('');
      setDefaultSelectBrand('tất cả');
    } else if (searchParams.get('brand') === '') {
      setDefaultSelectCategory(searchParams.get('category'));
      setDefaultSelectBrand('tất cả');
    } else {
      setDefaultSelectCategory(searchParams.get('category'));
      setDefaultSelectBrand(searchParams.get('brand'));
    }
  }, [navigate, searchParams]);

  useEffect(() => {
    console.log('i want to sleep');
  }, [defaultSelectCategory]);
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
    const pageParam = searchParams.get('page') || '1';
    setBrand(brands[valueCategory.indexOf(e.key)]);
    searchParams.set('category', e.key);
    searchParams.set('brand', '');
    searchParams.set('page', pageParam);
    setSearchParams(searchParams);
    setDefaultSelectBrand('tất cả');
  };
  const onClickBrand = (e) => {
    const categoryParam = searchParams.get('category') || '';
    const pageParam = searchParams.get('page') || '1';
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
    <div className="h-full w-divlogo overflow-x-hidden overflow-y-scroll">
      <Menu
        onClick={onClickCategory}
        style={{
          width: '100%',
          fontWeight: 'bold',
        }}
        selectedKeys={[defaultSelectCategory]}
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
        selectedKeys={[defaultSelectBrand]}
        defaultOpenKeys={['brand']}
        mode="inline"
        items={itemsBrand}
      />
    </div>
  );
}

export default Category;
