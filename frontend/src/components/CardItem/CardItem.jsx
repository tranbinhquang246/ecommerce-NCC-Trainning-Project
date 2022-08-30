import React from 'react';
import { Link } from 'react-router-dom';

function CardItem({
  ruleAdmin, element, index, setIsModalVisible, setIdProduct, setNameProduct,
}) {
  const handleClickDelete = (event, id, name) => {
    setIdProduct(id);
    setNameProduct(name);
    setIsModalVisible(true);
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-[259px] w-[259px] border border-[#BABABA]/50 shadow-lg rounded-md bg-white pt-[10px] pb-[18px] pr-[16px] pl-[16px]"
      key={element._id}
    >
      <Link to={`/product/${element._id}`} className="w-full h-[140px]">
        <img className="w-full h-full rounded-t-md" alt={index} src={element.mainImg} />
      </Link>
      <h5 className="font-medium h-[27px] w-[209px] mt-[27px] text-[15px] text-[#171B2F] overflow-hidden whitespace-nowrap text-ellipsis">
        {element.name}
      </h5>
      {ruleAdmin ? (
        <div className="flex w-full h-[31px] justify-around items-center">
          <Link
            to={`/edit/${element._id}`}
            className="flex justify-center items-center bg-[#6ECB63] w-2/6 h-full rounded-sm hover:text-white text-[14px] text-black"
          >
            <button type="button">Cập nhật</button>
          </Link>
          <button
            type="button"
            className="flex justify-center items-center bg-[#FF4D4D] w-2/6 h-full rounded-sm hover:text-white text-[14px]"
            onClick={(event) => handleClickDelete(event, element._id, element.name)}
          >
            Xóa
          </button>
        </div>
      ) : (
        <p className="font-light w-full ml-1 text-xs text-[#62677A]">$ {element.price}</p>
      )}
    </div>
  );
}

export default CardItem;
