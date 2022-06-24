import React from 'react';
import {
  Link,
} from 'react-router-dom';

const SideBar = () => (
  <div>
    <ul>
      <li>
        <Link to="/quan-ly-sp">Quản lý sản phẩm</Link>
      </li>
      <li>
        <Link to="/danh-sach-sp">Sản phẩm</Link>
      </li>
    </ul>
  </div>
);

export default SideBar;
