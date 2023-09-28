import "./css/Basket.css";
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react'

const BasketItem = ({ cart, removeFromCart } ) => {
  const [paymentDate] = useState(new Date()); // Создаем объект Date с текущей датой
  const options = { month: 'long', day: 'numeric' };
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
    <div>
  <h2 className="product-order">Оплачивается</h2>
  <div className="product-container">
    {cart.map((product) => (
      <div className="product-card" key={product.id}>
          
        <div className="product-image-container">
          <img src={"/img/img/" + product.img} alt="фото" className="product-image" />
        </div>
        <div className="product-details">
        <p className="product-created">Создан: {paymentDate.toLocaleDateString("ru-RU", options)}</p>
          <h3 className="product-name">{product.name.toUpperCase()}</h3>
          <p className="product-price">Цена: <b>{product.price}</b></p>
          <p className="product-size">Размер: <b>{product.size}</b></p>

          {product.quantity > 1 && (
            <p className="product-quantity">Количество: <b>{product.quantity}</b></p>
          )}
          <button className="buy-button">Оплатить</button> 
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default BasketItem;