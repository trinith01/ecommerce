import React, { useContext, useEffect, useState } from 'react';
import './ProductDisplay.css';
import { FaMinus, FaPlus } from 'react-icons/fa';

// const useResponsiveStyles = () => {
//   const [containerStyles, setContainerStyles] = useState({
//     width: '600px',
//     height: '650px',
//     margin: '0 auto',
//     borderRadius: '20px'
//   });

//   useEffect(() => {
//     const updateStyles = () => {
//       if (window.innerWidth <= 480) {
//         setContainerStyles({
//           width: '300px', 
//           height: '360px', 
//           margin: '0 0',
//           borderRadius: '10px',
//         });
//       } else if (window.innerWidth <= 560) {
//         setContainerStyles({
//           width: '200px',
//           height: '250px',
//           margin: '0 0',
//           borderRadius: '10px',
//         });
//       } else if (window.innerWidth <= 768) {
//         setContainerStyles({
//           width: '250px', 
//           height: '300px', 
//           margin: '0 0',
//           borderRadius: '10px',
//         });
//       } else if (window.innerWidth <= 900) {
//         setContainerStyles({
//           width: '300px', 
//           height: '360px', 
//           margin: '0 0',
//           borderRadius: '10px',
//         });
//       } else if (window.innerWidth <= 1024) {
//         setContainerStyles({
//           width: '350px',
//           height: '440px',
//           margin: '0 0',
//           borderRadius: '10px',
//         });
//       } else if (window.innerWidth <= 1330) {
//         setContainerStyles({
//           width: '500px', 
//           height: '600px', 
//           margin: '0 0',
//           borderRadius: '10px',
//         });
//       } else {
//         setContainerStyles({
//           width: '550px',
//           height: '650px',
//           margin: '0 auto',
//           borderRadius: '10px',
//         });
//       }
//     };


//     window.addEventListener('resize', updateStyles);
//     updateStyles(); 

//     return () => window.removeEventListener('resize', updateStyles);
//   }, []);

//   return containerStyles;
//};



const ProductDisplay = (props) => {
  const { product } = props;
  const [size1, setSize1] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [color1, selectColors1] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const selectSize = (size) => {
    if (product.available) {
      setSize1(size);
    } else {
      alert('This Product is not available');
    }
  };

  const selectColors = (color) => {
    if (product.available) {
      selectColors1(color);
    } else {
      alert('This Product is not available');
    }
  };

  const handleAction = () => {
    if (product.available) {
      if (localStorage.getItem('auth-token')) {
        if (!size1) {
          setAlertMessage('*Please select size');
          return;
        }
        if (!color1) {
          setAlertMessage('*Please select color');
          return;
        }
        if (!size1 || !color1) {
          setAlertMessage('*Please select both size and color');
        } else {
          setAlertMessage('Added to bag');
        }
      } else {
        setAlertMessage('*Please login before order');
      }
    } else {
      alert('This Product is not available');
    }
  };

  const [quantity, setQuantity] = useState(1);

  // Function to handle decrement of quantity
  const handleDecrement = () => {
    setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1)); // Ensures the quantity doesn't go below 1
  };

  // Function to handle increment of quantity
  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const slides = [];
  if (product.image) {
    slides.push(product.image);
  }
  if (product.image_2) {
    slides.push(product.image_2);
  }
  if (product.image_3) {
    slides.push(product.image_3);
  }

  // const containerStyles = useResponsiveStyles();

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className='productdisplay-main-img'>
            <img src={product.image} alt='' />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className='availability'>{!product.available ? <p>*This product not available</p> : <></>}</div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-new">Rs.{product.new_price}</div>
          {product.old_price ? <div className="productdisplay-right-price-old">Rs.{product.old_price}</div> : <></>}
        </div>
        <div className="productdisplay-right-description">
          {isExpanded || product.description.length <= 200 ? (
            product.description
          ) : (
            <>
              {product.description.substring(0, 200)}...
              <button onClick={() => setIsExpanded(true)}>See More</button>
            </>
          )}
          {isExpanded && (
            <button onClick={() => setIsExpanded(false)}>See Less</button>
          )}
        </div>
        <div className='productdisplay-right-color'>
          <h4 className='text-lg'>Select Color</h4>
          <div className='productdisplay-right-colors'>
            {product.colors.map((color, index) => (
              <button
                key={index}
                onClick={() => selectColors(color)}
                style={{
                  background: color,
                  border: color1 === color ? '2px solid black' : 'none',
                  position: 'relative',
                }}
                className='rounded-xl'
              >
                {color1 === color && (
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    style={{
                      position: 'absolute',
                      top: '5px',
                      left: '5px',
                      width: '24px',
                      height: '24px',
                      fill: '#fff',
                      stroke: '#fff', 
                      strokeWidth: '0', 
                      color: 'lightgreen',
                    }}
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M19.7071 4.29289C20.0976 4.68342 20.0976 5.31658 19.7071 5.70711L10.7071 14.7071C10.3166 15.0976 9.68342 15.0976 9.29289 14.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L10 12.5858L18.2929 4.29289C18.6834 3.90237 19.3166 3.90237 19.7071 4.29289Z'
                      fill='currentColor'
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="productdisplay-right-size">
    {product.avl_size && product.avl_size.length > 0 ? (
      <>
        <h4>Select Shirt Size</h4>
        <div className="productdisplay-right-sizes">
          {product.avl_size.map((size, index) => (
            <button
              key={index}
              className={size1 === size ? 'active' : ''}
              onClick={() => selectSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </>
    ) : null} 
    <div className='clz flex items-center'>
      <h4 className='mr-2 text-lg'>Quantity: </h4>
      <FaMinus
        className='flex items-center justify-center'
        style={{
          borderRadius: '100%',
          width: '25px',
          height: '25px',
          cursor: 'pointer',
          backgroundColor: '#f0f0f0',
          padding: '5px'
        }}
        onClick={handleDecrement} // Decrease the quantity on click
      />
      <div className="productdisplay-right-sizes-new mx-2">
        <button className='active text-black font-bold'>
          {quantity} {/* Display the current quantity */}
        </button>
      </div>
      <FaPlus
        style={{
          borderRadius: '100%',
          width: '25px',
          height: '25px',
          cursor: 'pointer',
          backgroundColor: '#f0f0f0',
          padding: '5px'
        }}
        onClick={handleIncrement} // Increase the quantity on click
      />
    </div>
    <h4 className='text-lg'>Stock Count: 30</h4>
  </div>
        <div className="productdisplay-right-addtoCart ">
          <button onClick={() => { handleAction() }} className={!product.available ? 'unavailable-button' : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700'}>
            {product.available ? 'ADD TO CART' : 'UNAVAILABLE'}
          </button>
          {alertMessage && <p className="alert-message bg-transparent hover:text-[#ff0000]">{alertMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default ProductDisplay;

