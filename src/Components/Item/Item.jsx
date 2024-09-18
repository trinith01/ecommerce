import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  const handleItemClick = () => {
    window.scrollTo(0, 0);
  };

  return (
      <div className='item'>
        <Link to={`/product/${props.name.replace(/\s+/g, '_')}`} style={{textDecoration:'none', color:'black'}} className="item-link" onClick={handleItemClick}>
          <img src={props.image} alt='' />
        </Link>
        <p className='name'>{props.name}</p>
        <p>{props.brand}</p>
        <div className='item-prices'>
          <div className="item-price-new">
            Rs.{props.new_price}
          </div>
        </div>
        <p>Stock Count: 30</p>
      </div>
  );
};

export default Item;


