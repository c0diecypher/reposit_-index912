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
      <div className="product-card" key={product.id}>
          
        <div className="product-image-container">
          <img src={product.img[0]} alt="фото" className="product-image" />
        </div>
        <div className="product-details">
          <div className="product-name-date">
            <div className="product-price"><b>{product.price} ₽</b></div>
            <div className="product-created">Создан: {paymentDate.toLocaleDateString("ru-RU", options)}</div>
          </div>
          <div className="product-name">{product.name.toUpperCase()}</div>
          <p className="product-size">Размер: <b>{product.size}</b></p>
          <Link
              to={`/products/confirm/${product.name}/${product.size}/${product.price}`}
              state={{ productData: product }}
            >
              <button className="buy-button">Оплатить</button> 
            </Link>
          
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default BasketItem;
