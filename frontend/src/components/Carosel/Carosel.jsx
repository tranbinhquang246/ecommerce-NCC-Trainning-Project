import React from 'react';
import { Carousel } from 'antd';
import './index.css';

function Carosel(props) {
  const { mainImg, slidesImg } = props;
  const results = slidesImg[0]?.filter((n) => n);
  results?.unshift(mainImg);
  if (slidesImg[0]?.filter((element) => element !== null).length !== 0) {
    return (
      <div className="grid grid-cols-1 grid-rows-1 w-full h-full">
        <Carousel>
          {results?.map((element) => (
            <img src={element} className="w-full h-full object-full" alt="" key={element} />
          ))}
        </Carousel>
      </div>
    );
  }
  return <img src={mainImg} className="w-full h-full" alt="" />;
}

export default Carosel;
