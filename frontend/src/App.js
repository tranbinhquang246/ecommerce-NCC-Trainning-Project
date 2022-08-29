import './App.css';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Error from './pages/Error/Error';
import Error404 from './pages/Error/Error404';
import Error400 from './pages/Error/Error400';
import Error500 from './pages/Error/Error500';
import MainLayout from './layout/MainLayout';
import Products from './pages/Products/Products';
import ProductManagement from './pages/Products/ProductsManagement';
import OverlayProvider from './context/OverlayContext';
import 'antd/dist/antd.min.css';
import ProductDetail from './pages/Products/ProductDetail';
import EditProduct from './pages/Products/EditProduct';

function App() {
  return (
    <OverlayProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Products />} />
            <Route path="/management" element={<ProductManagement />} />
            <Route path="/product/:productID" element={<ProductDetail />} />
            <Route path="/edit/:productID" element={<EditProduct />} />
            <Route path="/not-found" element={<Error404 />} />
            <Route path="/bad-request" element={<Error400 />} />
            <Route path="/err-server" element={<Error500 />} />
            <Route path="*" element={<Error />} />
          </Route>
          <Route path="/products" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </OverlayProvider>
  );
}

export default App;
