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
      className="flex flex-col h-full w-full border border-[#BABABA]/50 shadow-lg rounded-md bg-white pt-2 pb-2 pr-3 pl-3"
      key={element._id}
    >
      <Link to={`/product/${element._id}`} className="w-full h-[75%]">
        <img className="w-full h-full rounded-t-md" alt={index} src={element.mainImg} />
      </Link>
      <h5 className="font-medium h-[10%] w-full ml-1 text-[15px] text-[#171B2F]">{element.name}</h5>
      {ruleAdmin ? (
        <div className="flex h-[15%] w-full justify-around items-center">
          <Link
            to={`/edit/${element._id}`}
            className="flex justify-center items-center bg-[#6ECB63] w-2/6 h-[80%] rounded-sm hover:text-white text-[1.5vh] text-black"
          >
            <button type="button">Cập nhật</button>
          </Link>
          <button
            type="button"
            className="flex justify-center items-center bg-[#FF4D4D] w-2/6 h-[80%] rounded-sm hover:text-white text-[1.5vh]"
            onClick={(event) => handleClickDelete(event, element._id, element.name)}
          >
            Xóa
          </button>
        </div>
      ) : (
        <p className="font-light ml-1 text-xs h-[15%] text-[#62677A]">$ {element.price}</p>
      )}
    </div>
  );
}

export default CardItem;
