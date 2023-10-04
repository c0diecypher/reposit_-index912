import "./css/Product.css";
import { useState, useEffect, useCallback } from "react"
import { useParams, useLocation } from "react-router-dom";
import Stories from "../Stories/Stories"
import { useTelegram } from "../Components/Hooks/useTelegram"
import { MainButton } from "@twa-dev/sdk/react" 

function ProductConfirm() {
  useEffect(() => {
    window.scrollTo(0, 0); // Прокрутка вверх при загрузке страницы
  }, []);
  const { productId, size, price, name, img } = useParams();
  const location = useLocation();
  

  // Декодируйте JSON-строку и преобразуйте ее в объект с данными о товаре
  const { productData } = location.state || {};

  // Отображаем информацию о товаре

  const [color] = useState(window.Telegram.WebApp.themeParams.button_color);
  const [textColor] = useState(
    window.Telegram.WebApp.themeParams.button_text_color
  );
  const {queryId} = useTelegram();
  const onSendData = useCallback(() => {
    const data = {
      name: productData.name,
      price: productData.price,
      size: productData.size,
      queryId
    };

    fetch('http://45.12.228.26:8000/web-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  }, []);

  return (
    <>
    <div className="confirm-item" key={productId}>
    <img src={"/img/img/" + productData.img} alt="photo" />
    
    <div className="confirm-item-name">{productData.name}
    
        <span className="confirm-item-size" > размер {size} US</span>
   
      </div>
    
      <div className="confirm-item-price">
         {price}₽
      </div>
      <div className="public-oferta">
        <p className="public-ofert-text">Оплачивая заказ, вы соглашаетесь <br/>с условиями <a className="public-oferta-link">публичной оферты</a></p>
      </div>
    
  </div>
  <div className="help-ful">
    <h2 className="help-title">Полезная инофрмация</h2>
    <div className="help-stories">
    <Stories />
    </div>
  </div>
  <MainButton 
                        onClick={() => {
                          alert(`Вы купили ${productData.name}, <br/>${size} <br/>за ${price} ₽`);
                        }}
                        color={color}
                        textColor={textColor}
                        text={`Купить за ${price}`}
                        />
  </>
  );
}

export default ProductConfirm;
