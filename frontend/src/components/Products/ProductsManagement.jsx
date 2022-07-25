import React from 'react';
import { useOutletContext } from 'react-router-dom';

function ProductsManagement() {
  const [setOpenModalAdd] = useOutletContext();
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col w-10/12 h-divproduct">
        <div className="flex justify-between items-center w-full h-divsearch">
          <button
            type="button"
            className=" hover:bg-[#00CCFF] hover:text-white text-[#00CCFF] py-[0.3rem] px-4 rounded-md border border-[#00CCFF]"
            onClick={() => setOpenModalAdd(true)}
          >
            Thêm sản phẩm
          </button>
          <input type="text" className="border border-black" />
        </div>
        <div className="flex justify-between items-center w-full h-full bg-slate-400 mt-5 rounded-md" />
      </div>
    </div>
  );
}

export default ProductsManagement;
