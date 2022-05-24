import React from 'react';
import {
  Link,
} from 'react-router-dom';

const SideBar = () => (
  <div>
    <ul>
      <li>
        <Link to="/home">Quản lý sản phẩm</Link>
      </li>
      <li>
        <Link to="/product">Sản phẩm</Link>
      </li>
    </ul>
  </div>
);

export default SideBar;
