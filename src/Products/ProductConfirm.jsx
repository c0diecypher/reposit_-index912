import "./css/Product.css";
import { useState } from "react"
import { useParams, useLocation } from "react-router-dom";

function ProductConfirm() {
  const { productId, size, price, name, img } = useParams();
  const location = useLocation();
  

  const { productData } = location.state || {};

  // Отображаем информацию о товаре
  const handleOrderClick = () => {
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
  <MainButton 
      onClick={handleOrderClick}
      color={color}
      textColor={textColor}
      text={text}
    />
  </div>
  </>
  );
}

export default ProductConfirm;
