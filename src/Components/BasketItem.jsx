import "./css/Basket.css";
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

const BasketItem = ({ cart, onDataUpdate, userId } ) => {
  const [paymentDate] = useState(new Date()); // Создаем объект Date с текущей датой
  const options = { month: 'short', day: 'numeric' };
  const [totalPrice, setTotalPrice] = useState(0);
  const [basketData, setBasketData] = useState([]);
  // Обновляем общую стоимость при изменении корзины

  useEffect(() => {
  const data = {
    userId
  };

  const fetchData = async () => {
    try {
      const response = await fetch('https://crm.zipperconnect.space/load/basket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      setBasketData(responseData);
      console.log('Ответ сервера:', responseData);
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  };

  // Вызываем функцию fetchData при монтировании компонента
   const fetchDataInterval = setInterval(fetchData, 5000); // Интервал опроса сервера
    console.log(fetchDataInterval);
    // Инициализация данных при загрузке компонента
    fetchData();

    return () => {
      clearInterval(fetchDataInterval); // Очистка интервала при размонтировании компонента
    };
}, [userId]); 
  
  BasketItem.propTypes = {
    cart: PropTypes.array.isRequired,
    removeFromCart: PropTypes.func.isRequired,
  };

  return (
    <>
      {basketData.length > 0 && basketData.map((product) => (
      <>
    <div className="product-block-order">
  <div className="product-order">Оплачивается</div>
  <div className="product-container">
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
      
    
  </div>
</div>
  </>
  ))}
    </>
  );
};

export default BasketItem;
