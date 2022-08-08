import './App.css';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Error from './components/Error/Error';
import Home from './pages/Mainpage/Home';
import Products from './components/Products/Products';
import ProductManagement from './components/Products/ProductsManagement';
import OverlayProvider from './context/OverlayContext';
import 'antd/dist/antd.min.css';
import ProductDetail from './components/Products/ProductDetail';

function App() {
  return (
    <OverlayProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Products />} />
            <Route path="/management" element={<ProductManagement />} />
            <Route path="/product/:productID" element={<ProductDetail />} />;
            <Route path="*" element={<Error />} />
          </Route>
          <Route path="/products" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />;
    </OverlayProvider>
  );
}

export default App;
