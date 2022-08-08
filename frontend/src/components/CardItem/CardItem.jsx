/* eslint-disable react/destructuring-assignment */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';

function CardItem(props) {
  const { element, index } = props;
  const navigate = useNavigate();

  const handleClickProducts = (event, id) => {
    navigate(`/product/${id}`, { replace: true });
    console.log(id);
  };

  return (
    <div className="w-1/3 h-full p-5">
      <div
        className="flex flex-col basis-44 m-2 h-40 shadow-lg rounded-md bg-white"
        key={element._id}
      >
        <img
          className="w-full h-3/5 rounded-t-md"
          alt={index}
          src={element.mainImg}
          onClick={(event) => handleClickProducts(event, element._id)}
        />
        <p className="font-medium ml-1 text-[15px] overflow-hidden">{element.name}</p>
        <p className="font-light -mt-2 ml-1 text-xs">$ {element.price}</p>
      </div>
    </div>
  );
}

export default CardItem;
