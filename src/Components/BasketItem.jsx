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
  
  BasketItem.propTypes = {
    cart: PropTypes.array.isRequired,
    removeFromCart: PropTypes.func.isRequired,
  };

  const handleDelete = async (productId, order_id) => {
    setBasketData(prevBasketData => prevBasketData.filter(item => item.order_id !== order_id));
    try {
      // Отправляем запрос на удаление элемента с заданным productId
      await axios.post('https://crm.zipperconnect.space/customers/user/basket/delete/item', {
        userId: userId,
        productId: productId,
        order_id: order_id,
      });

      // Обновляем локальный стейт basketData, удаляя элемент с заданным productId
    } catch (error) {
      console.error('Ошибка при удалении товара:', error);
      // Обрабатываем ошибку по необходимости
    }
  };

  return (
    <>
    {basketData.length > 0 && (
    <div className="product-block-order">
  <div className="product-order">Оплачивается</div>
      
  <div className="product-container">
  {basketData.map((product) => (
      <div key={product.id} className="product-container-order" >
        <div className="product-swiper">
        <Link
                    to={`/products/confirm/offer/${product.name}/${product.size}/${product.price}`}
                    state={{ productData: product }}
                    className="item-link">
        
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
      <button onClick={() => handleDelete(product.id)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ai ai-Cross"><path d="M20 20L4 4m16 0L4 20"/></svg>
      </button>
  </div>
  ))} 
    
  </div>
</div>
  )}
    </>
  );
};

export default BasketItem;
