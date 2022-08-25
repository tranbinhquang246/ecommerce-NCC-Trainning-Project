/* eslint-disable react/destructuring-assignment */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
  const { ruleAdmin, element, index } = props;

  return (
    <div
      className="flex flex-col h-full w-full border border-[#BABABA]/50 shadow-lg rounded-md bg-white pt-2 pb-2 pr-3 pl-3"
      key={element._id}
    >
      <Link to={`/product/${element._id}`} className="w-full h-[65%]">
        <img className="w-full h-full rounded-t-md" alt={index} src={element.mainImg} />
      </Link>
      <h5 className="font-medium h-[10%] w-full ml-1 text-[15px] text-[#171B2F]">{element.name}</h5>
      {ruleAdmin ? (
        <div className="flex -mt-2 ml-1 w-full justify-around">
          <button type="button" className="bg-green-500 w-2/6 h-6 mb-1 rounded-sm">
            <Link to={`/edit/${element._id}`} className="text-black hover:text-white">
              Cập nhật
            </Link>
          </button>
          <button
            type="button"
            className="bg-red-500 w-2/6 h-6 mb-1 rounded-sm hover:text-white"
            // onClick={(event) => handleClickDelete(event, element._id, element.name)}
          >
            Xóa
          </button>
        </div>
      ) : (
        <p className="font-light ml-1 text-xs h-[25%] text-[#62677A]">$ {element.price}</p>
      )}
    </div>
  );
}

export default CardItem;
