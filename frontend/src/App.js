import './App.css';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Error from './components/Error/Error';
import Error404 from './components/Error/Error404';
import Error400 from './components/Error/Error400';
import Error500 from './components/Error/Error500';
import Home from './pages/Mainpage/Home';
import Products from './components/Products/Products';
import ProductManagement from './components/Products/ProductsManagement';
import OverlayProvider from './context/OverlayContext';
import 'antd/dist/antd.min.css';
import ProductDetail from './components/Products/ProductDetail';
import EditProduct from './components/Products/EditProduct';

function App() {
  return (
    <OverlayProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
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
