import "./css/Basket.css";
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

const BasketItem = ({ cart, onDataUpdate } ) => {
  const [paymentDate] = useState(new Date()); // Создаем объект Date с текущей датой
  const options = { month: 'short', day: 'numeric' };
  const [totalPrice, setTotalPrice] = useState(0);
  // Обновляем общую стоимость при изменении корзины
    useEffect(() => {
  // Считаем общую стоимость всех товаров в корзине
      const newTotalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);
      setTotalPrice(newTotalPrice);
    }, [cart]);
  
  
  BasketItem.propTypes = {
    cart: PropTypes.array.isRequired,
    removeFromCart: PropTypes.func.isRequired,
  };

  return (
    <div className="product-block-order">
  <div className="product-order">Оплачивается</div>
  <div className="product-container">
    {cart.map((product) => (
      <>
      <div className="product-container-order">
        <Link
                    to={`/products/confirm/offer/${product.name}/${product.size}/${product.price}`}
                    state={{ productData: product }}
                    className="item-link">
        
        <div className="product-image-component">
          <div className="product-image-container">
            <div className="product-image-card">
              <div className="product-image-inner">
              <img src={product.img[0]} alt="фото" className="product-image-inner-row" />
              </div>
            </div>
          </div>
        </div>

        <div className="product-details">
          <div className="product-price-and-datecreated">
            <div className="product-price-and-date">
            <span className="product-price">{product.price}</span>
            <span className="product-created">Создан: {paymentDate.toLocaleDateString("ru-RU", options)}</span>
            </div>
          </div>
          <div className="product-name">{product.name.toUpperCase()}</div>
          <span className="product-size">Размер: <b>{product.size}</b></span>
          
          
          <span className="product-size">Оплатить</span>
            
          
          </div>
          
  </Link>
  </div>
      </>
    ))}
  </div>
</div>
  );
};

export default BasketItem;
