import "./css/Product.css";
import { MainButton } from "@twa-dev/sdk/react" 
import { useState } from "react"
import { useParams, useLocation } from "react-router-dom";

function ProductConfirm() {
  const { productId, size, price, name, img } = useParams();
  const location = useLocation();
  

  // Декодируйте JSON-строку и преобразуйте ее в объект с данными о товаре
  const { productData } = location.state || {};

  // Отображаем информацию о товаре

  const [color] = useState(window.Telegram.WebApp.themeParams.button_color);
  const [textColor] = useState(
    window.Telegram.WebApp.themeParams.button_text_color
  );
  return (
    <>
    <div className="full-item" key={productId}>
    <img src={"/img/img/" + productData.img} alt="photo" />
    
    <div className="full-item-name">{productData.name}
    
        
      <div className="full-item-size">
        <b> размер {size} US</b>
      </div>
   
      </div>
    
      <div className="full-item-price">
         <b>{price}₽</b>
      </div>
      <div className="public-oferta">
        <p className="public-ofert-text">Оплачивая заказ, вы соглашаетесь <br/>с условиями <a className="public-oferta-link">публичной оферты</a></p>
      </div>
      
    
  </div>
  <MainButton 
        onClick={() => {
          alert(`Вы купили ${productData.name}, размер: ${size}за ${price} ₽`);
        }}
        color={color}
        textColor={textColor}
        text={`Купить за ${price}`}
        />
  </>
  );
}

export default ProductConfirm;
