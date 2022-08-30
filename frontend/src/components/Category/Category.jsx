/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import useLoading from '../../hooks/useLoading';
import './index.css';

function Category() {
  const [showLoading, hideLoading] = useLoading();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [valueCategory, setValueCategory] = useState([]);
  const [brands, setBrands] = useState([]);
  const [valuebrands, setValueBrands] = useState([]);
  const [brand, setBrand] = useState([]);
  const [valueBrand, setValueBrand] = useState([]);
  const [disableMenu, setDisableMenu] = useState([]);

  const [defaultSelectCategory, setDefaultSelectCategory] = useState();
  const [defaultSelectBrand, setDefaultSelectBrand] = useState();

  useEffect(() => {
    let arrCategorys = ['Tất cả'];
    let arrCategoryValues = [''];
    let arrBrands = [];
    let arrBrandValues = [];
    let allBrands = [];
    let allBrandsValues = [];

    const fetchData = async () => {
      showLoading();
      try {
        axios
          .get('http://localhost:5000/category')
          .then((response) => {
            response[0].data?.forEach((element) => {
              arrCategorys = [...arrCategorys, element.categoryNames];
              arrCategoryValues = [...arrCategoryValues, element.categoryValues];
              arrBrands = [...arrBrands, element.brandNames];
              arrBrandValues = [...arrBrandValues, element.brandValues];
            });
          })
          .then(() => {
            setCategory(arrCategorys);
            setValueCategory(arrCategoryValues);
            setBrands(arrBrands);
            setValueBrands(arrBrandValues);
            allBrands = [].concat([], ...arrBrands);
            allBrandsValues = [].concat([], ...arrBrandValues);
            arrBrands = [allBrands, ...arrBrands];
            arrBrandValues = [allBrandsValues, ...arrBrandValues];
            setBrands(arrBrands?.map((element) => ['Tất cả', ...element]));
            setValueBrands(arrBrandValues?.map((element) => ['', ...element]));
          });
      } catch (error) {
        console.error(error.message);
      } finally {
        hideLoading();
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (searchParams.get('category') === null) {
      setBrand(brands[0]);
      setValueBrand(valuebrands[0]);
    } else {
      valueCategory.map((element, index) => {
        if (searchParams.get('category') === element) {
          setBrand(brands[index]);
          setValueBrand(valuebrands[index]);
        }
      });
    }
  }, [brands]);

  useEffect(() => {
    if (window.location.href.includes('product') || window.location.href.includes('edit')) {
      setDisableMenu(true);
    } else {
      setDisableMenu(false);
    }
    const selectCategory = searchParams.get('category');
    const selectBrand = searchParams.get('brand');
    setDefaultSelectCategory(selectCategory || '');
    setDefaultSelectBrand(selectBrand || '');
  }, [navigate, searchParams]);

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
      brand?.map((element, index) => getItem(element, valueBrand[index])),
    ),
  ];
  const onClickCategory = (e) => {
    setBrand(brands[valueCategory.indexOf(e.key)]);
    setValueBrand(valuebrands[valueCategory.indexOf(e.key)]);
    searchParams.set('category', e.key);
    searchParams.set('brand', '');
    setSearchParams(searchParams);
    setDefaultSelectBrand('');
  };
  const onClickBrand = (e) => {
    searchParams.set('brand', e.key);
    setSearchParams(searchParams);
  };
  return (
    <div className="min-w-[200px] w-[269px] overflow-x-hidden overflow-y-scroll">
      <Menu
        onClick={onClickCategory}
        style={{
          width: '100%',
          fontWeight: 'bold',
        }}
        disabled={disableMenu}
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
        disabled={disableMenu}
        selectedKeys={[defaultSelectBrand]}
        defaultOpenKeys={['brand']}
        mode="inline"
        items={itemsBrand}
      />
    </div>
  );
}

export default Category;
