import "./css/Basket.css";
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import productsData from "../Products/productsData";
import axios from 'axios';

const BasketPaid = ({ cart, onDataUpdate, userId } ) => {
  const [paymentDate] = useState(new Date()); // Создаем объект Date с текущей датой
  const options = { month: 'short', day: 'numeric' };
  const [totalPrice, setTotalPrice] = useState(0);
  const [paidData, setPaidData] = useState([]);
  // Обновляем общую стоимость при изменении корзины

  useEffect(() => {
    reloadBasketPaid();
    SendBasketPaid();
  },[])
  
  const reloadBasketPaid = async () => {
    const eventSource = new EventSource('https://crm.zipperconnect.space/connect/basketpaid')
    eventSource.onmessage = function (event){
      const basketpaid = JSON.parse(event.data);
      setPaidData(basketpaid);
    }
  };
  
  const SendBasketPaid = async () => {
    await axios.post('https://crm.zipperconnect.space/get/basketpaid',{
      userId: userId,
    })
  };
  
  BasketPaid.propTypes = {
    cart: PropTypes.array.isRequired,
    removeFromCart: PropTypes.func.isRequired,
  };

  return (
    <>
    {paidData.length > 0 && (
    <div className="product-block-order">
  <div className="product-order">Оплачено</div>
      
  <div className="product-container">
  {paidData.map((product) => (
      <>
        
      <div key={product.id} className="product-container-order" >
        <Link
                    to={`/products/confirm/offer/paid/${product.name}/${product.size}/${product.price}`}
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
          <div className="product-name">{product.name.toUpperCase()}</div>
          <span className="product-size">Размер: <b>{product.size}</b></span>
            
          
          </div>
          
  </Link>
  </div>
     </>
  ))} 
    
  </div>
</div>
  )}
    </>
  );
};

export default BasketPaid;
