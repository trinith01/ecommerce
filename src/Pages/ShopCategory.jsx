import React, { useState, useEffect} from 'react'
import './CSS/ShopCategory.css'
import Item from '../Components/Item/Item'
import data_product from '../Components/Assets/all_product';

const ShopCategory = (props) => {
  const [all_product,setAll_Product] = useState([]);
  const [sortMethod, setSortMethod] = useState('date');
  const [productArr, setProductArr] = useState([]);

  useEffect(() => {
    setAll_Product(data_product);
  }, []);

  useEffect(() => {
    setProductArr(all_product.filter(item => props.category === item.category));
  }, [all_product, props.category]);

  const containerStyles = {
    width:'100%',
    height:'18vw',
    margin: '80px auto',
    alignItems : 'center',
  }

  
    const [styles, setStyles] = useState(getStyles(window.innerWidth));
  
    function getStyles(width) {
      if (width <= 480) {
        return {
          width: '100%',
          height: '30vw',
          margin: '20px auto',
          alignItems: 'center',
        };
      } else if (width <= 768) {
        return {
          width: '100%',
          height: '25vw',
          margin: '40px auto',
          alignItems: 'center',
        };
      } else {
        return {
          width: '100%',
          height: '20vw',
          margin: '80px auto',
          alignItems: 'center',
        };
      }
    }
  
    useEffect(() => {
      const handleResize = () => {
        setStyles(getStyles(window.innerWidth));
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  const changeHandler = (e) => {
    setSortMethod(e.target.value);
  }

  const dynamicSort = (a, b) => {
    if (sortMethod === 'new_price') {
      return a.new_price - b.new_price;
    }
  }

  return (
    <div className='shop-category'>
      <div className='shopcategory-indexSort'>
        <p>
          <span>Showing 1-{productArr.length}</span> out of {productArr.length} products
        </p>
        <div className="shopcategory-sort">
          <p>Sort By</p>
          <select onChange={changeHandler} className='add-product-selector'>
              <option value='date'>Date</option>
              <option value='new_price'>Price</option>
          </select>
        </div>
      </div>
      
      {productArr.length === 0 && <h3>No products to show</h3>}
      <div className="shopcategory-products">
        {productArr.sort(dynamicSort).map((item, i) => {
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>

      <div className="shopcategory-products-mobile">
        {productArr.sort(dynamicSort).map((item, i) => {
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} imageStyle={{ borderRadius: '60px' }} />
        })}
      </div>

      {productArr.length !== 0 && <div className="shopcategory-loadmore">
        Explore More
      </div>}
    </div>
  )
}

export default ShopCategory
