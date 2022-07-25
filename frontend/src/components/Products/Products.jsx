import React from 'react';

function Products() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col w-10/12 h-divproduct">
        <div className="flex justify-between items-center w-full h-divsearch">
          <div />
          <input type="text" className="border border-black" />
        </div>
        <div className="flex justify-between items-center w-full h-full bg-slate-400 mt-5 rounded-md" />
      </div>
    </div>
  );
}

export default Products;
