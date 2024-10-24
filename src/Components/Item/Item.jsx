import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  const handleItemClick = () => {
    window.scrollTo(0, 0);
  };

  return (
      <div className='item justify-center items-center text-center'>
        <Link to={`/product/${props.name.replace(/\s+/g, '_')}`} style={{textDecoration:'none', color:'black'}} className="item-link" onClick={handleItemClick}>
          <img src={props.image} alt='' />
        </Link>
        <p className='name bg-transparent'>{props.name}</p>
        <p className='bg-transparent'>{props.brand}</p>
        <div className='item-prices items-center text-center justify-center '>
          <div className="item-price-new items-center text-center justify-center ">
            Rs.{props.new_price}
          </div>
        </div>
        <p className='bg-transparent'>Stock Count: 30</p>
      </div>
  );
};

export default Item;


