import "./css/Basket.css";
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import productsData from "../Products/productsData";

const BasketItem = ({ cart, onDataUpdate, userId } ) => {
  const [paymentDate] = useState(new Date()); // Создаем объект Date с текущей датой
  const options = { month: 'short', day: 'numeric' };
  const [totalPrice, setTotalPrice] = useState(0);
  const [basketData, setBasketData] = useState([]);
  const [swipeStartIndex, setSwipeStartIndex] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  // Обновляем общую стоимость при изменении корзины

  useEffect(() => {
    reloadBasket();
    SendBasket();
  },[])
  
  const reloadBasket = async () => {
    const eventSource = new EventSource('https://crm.zipperconnect.space/connect/basket')
    eventSource.onmessage = function (event){
      const basket = JSON.parse(event.data);
      setBasketData(basket);
    }
  };
  
  const SendBasket = async () => {
    await axios.post('https://crm.zipperconnect.space/get/basket',{
      userId: userId,
    })
  };

  const handleTouchStart = (index, event) => {
    setSwipeStartIndex(index);
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event) => {
    if (swipeStartIndex !== null) {
      const touchMoveX = event.touches[0].clientX;
      const deltaX = touchMoveX - touchStartX;
  
      if (deltaX < 0) {
        setSwipeDirection('left'); // Set swipe direction to left
        const productContainers = document.querySelectorAll('.product-container a');
  
        productContainers.forEach((container, index) => {
          if (index === swipeStartIndex) {
            container.style.transform = `translateX(${deltaX}px)`;
          } else {
            container.style.transform = '';
          }
        });
  
        setShowDeleteIcon(true); // Show delete icon on left swipe
        setShowDelete(false);
      } else {
        setSwipeDirection(null); // Reset swipe direction
        setShowDeleteIcon(false);
        setShowDelete(false);
      }
    }
  };

  const handleTouchEnd = (event) => {
    if (swipeStartIndex !== null) {
      // Reset transforms
      const productContainers = document.querySelectorAll('.product-container a');
      productContainers.forEach((container) => {
        container.style.transform = '';
      });

      // Handle delete if swipe exceeds a threshold
      const touchEndX = event.changedTouches[0].clientX;
      const deltaX = touchEndX - touchStartX;
      const swipeThreshold = window.innerWidth; // Adjust the threshold as needed

      if (deltaX < -swipeThreshold) {
        handleDelete(swipeStartIndex);
      }

      // Reset state
      setSwipeStartIndex(null);
      setTouchStartX(null);
      setShowDelete(false);
      setShowDeleteIcon(false);
    }
  };

  const handleDelete = (index) => {
    // Implement your logic to delete item from the basket
    const updatedBasket = [...basketData];
    updatedBasket.splice(index, 1);
    setBasketData(updatedBasket);
    // Update the server or perform other necessary actions
    onDataUpdate(updatedBasket);
  };
  
  BasketItem.propTypes = {
    cart: PropTypes.array.isRequired,
    removeFromCart: PropTypes.func.isRequired,
  };

  return (
    <>
    {basketData.length > 0 && (
    <div className="product-block-order">
  <div className="product-order">Оплачивается</div>
      
  <div className="product-container">
  {basketData.map((product, index) => (
      <div key={product.id} className="product-container-order" >
        <Link
          to={`/products/confirm/offer/${product.name}/${product.size}/${product.price}`}
          state={{ productData: product }}
          className={`item-link ${showDelete && index === swipeStartIndex ? 'swipe-animation' : ''}`}
          onTouchStart={(event) => handleTouchStart(index, event)}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          >
        
        <div className="product-image-component">
          <div className="product-image-container">
            <div className="product-image-card">
              <div className="product-image-inner">
              
                   
              <img src={productsData.find(item => item.id === product.id)?.img[0]} alt="фото" className="product-image-inner-row" />
                       
    
              </div>
            </div>
          </div>
        </div>

        <div className="product-details">
          <div className="product-price-and-datecreated">
            <div className="product-price-and-date">
            <span className="product-price">{product.price}</span>
            <span className="product-created">Создан: {product.time}</span>
            </div>
          </div>
          <div className="product-name">{product.name}</div>
          <span className="product-size">Размер: <b>{product.size}</b></span>
          
          
          <span className="product-size">Оплатить</span>
            
          
          </div>
          
  </Link>
  </div>
  ))} 
    
  </div>
</div>
  )}
    </>
  );
};

export default BasketItem;
