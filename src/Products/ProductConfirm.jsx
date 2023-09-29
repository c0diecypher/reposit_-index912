import "./css/Product.css";
import { useState } from "react"
import { useParams, useLocation } from "react-router-dom";

function ProductConfirm({dataFromMainButton}) {
  const { productId, size, price, name, img } = useParams();
  const location = useLocation();
  

  // Декодируйте JSON-строку и преобразуйте ее в объект с данными о товаре
  const { productData } = location.state || {};

  // Отображаем информацию о товаре
  const handlePaymentClick = () => {
    alert(`Вы купили ${productName} за ${productPrice} ₽`)
  }
  const [color] = useState(window.Telegram.WebApp.themeParams.button_color);
  const [textColor] = useState(
    window.Telegram.WebApp.themeParams.button_text_color
  );
  const [text] = useState(`Купить за ${price}`);
  return (
    <>
    <div className="full-item" key={productId}>
    <img src={"/img/img/" + productData.img} alt="photo" />
    <h4 className="full-item-name">{productData.name}</h4>
    <span className="full-item-price"> {price} ₽</span>
    <span className="full-item-price-order">
         Размер
      <span className="full-item-size">
        <b>{size}</b>
      </span>
    </span>
    {dataFromMainButton && (
  <MainButton 
      onClick={handlePaymentClick}
      color={color}
      textColor={textColor}
      text={text}
    />
)}
  </div>
  </>
  );
}

export default ProductConfirm;
