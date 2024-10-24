import React, {useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import './CSS/Product.css';
import data_product from '../Components/Assets/all_product';

const Product = () => {
  const [all_product,setAll_Product] = useState([]);
  const {productId} = useParams();
  const formattedProductId = String(productId).replace(/_/g, ' ');
  useEffect(() => {
    setAll_Product(data_product);
  }, []);
  const product = all_product.find((e)=> e.name=== formattedProductId);

  if(!product){
    return null;
  }

  return (
    <div className='product pt-16'>
      <ProductDisplay product={product}/>
      <RelatedProducts product={product}/>
    </div>
  )
}

export default Product