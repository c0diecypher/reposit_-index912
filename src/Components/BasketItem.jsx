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

  return (
    <>
    {basketData.length > 0 && (
    <div className="product-block-order">
  <div className="product-order">Оплачивается</div>
      
  <div className="product-container">
  {basketData.map((product) => (
      <div key={product.id} className="product-container-order" >
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
  ))} 
    
  </div>
</div>
  )}
    </>
  );
};

export default BasketItem;
