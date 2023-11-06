import "./css/Product.css";
import "./css/SelectSize.css"
import { useState, useEffect, useCallback } from "react"
import { useParams, useLocation } from "react-router-dom";
import Stories from "../Stories/Stories"
import { useTelegram } from "../Components/Hooks/useTelegram"
import { MainButton } from "@twa-dev/sdk/react" 

function ProductPay() {
  useEffect(() => {
    window.scrollTo(0, 0); // Прокрутка вверх при загрузке страницы
  }, []);
  const { productId, size, price, name} = useParams();
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

    fetch('https://zipperconnect.space/customer/settings/client/buy/offer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  }, [name, price, size, queryId]);

  useEffect(()=>{
    window.Telegram.WebApp.onEvent('mainButtonClicked', onSendData)
    return () => {
      window.Telegram.WebApp.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])

  return (
    <>
    <div className="confirm-item" key={productId}>
      <div className="images-slider-wrapper">
        <div className="images-slider-images">
          <div className="images-slider-image-item">
            <div className="image-item-wrapper">
              <img src={productData.img[0]} alt="photo" />
            </div>
          </div>
          <div className="images-slider-image-item">
            <div className="image-item-wrapper">
              <img src={productData.img[1]} alt="photo" />
            </div>
          </div>
          <div className="images-slider-image-item">
            <div className="image-item-wrapper">
              <img src={productData.img[2]} alt="photo" />
            </div>
          </div>
          <div className="images-slider-image-item">
            <div className="image-item-wrapper">
              <img src={productData.img[3]} alt="photo" />
            </div>
          </div>
          <div className="images-slider-image-item">
            <div className="image-item-wrapper">
              <img src={productData.img[4]} alt="photo" />
            </div>
          </div>
          <div className="images-slider-image-item">
            <div className="image-item-wrapper">
              <img src={productData.img[5]} alt="photo" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-full-item-name">
    <div className="confirm-item-name">{productData.name}
        <span className="confirm-item-size" > размер {size} EU</span>
   
      </div>
      </div>
      <div className="item-order-info">

        <div className="status-selection-steps-box">
            <div className="status-selection-step">
                <div className="status-selection-step-inner">
                <svg viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m4.917 10 4.166 4.166 8.334-8.333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>

                </div>
                    <span className="status-selection-line"></span>
                    <div className="status-selection-step-inner">
                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M33.333 12.5 20 5 6.667 12.5m26.666 0v15L20 35m13.333-22.5L20 20m0 15L6.667 27.5v-15M20 35V20M6.667 12.5 20 20m6.667-11.25-13.334 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </div>
                    <span className="status-selection-line"></span>
                    <div className="status-selection-step-inner">
                    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 14.166a1.667 1.667 0 1 1-3.333 0m3.333 0a1.667 1.667 0 1 0-3.333 0m3.333 0h5m-8.333 0H2.5v-3.333m13.333 3.333a1.667 1.667 0 1 1-3.333 0m3.333 0a1.667 1.667 0 1 0-3.333 0m3.333 0H17.5v-5m-15.833-5h9.166v10m6.667-5h-6.667m6.667 0L15 5h-4.167M2.5 7.5h3.333" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </div>
                    <span className="status-selection-line"></span>
                    <div className="status-selection-step-inner">
                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.333 35V8.333a8.333 8.333 0 0 1 11.667 0 8.333 8.333 0 0 0 11.667 0v15a8.333 8.333 0 0 1-11.667 0 8.333 8.333 0 0 0-11.667 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </div>
                    
            </div>
        </div>
      <div className="product-offer-id">
       Заказ {productData.order_id}
      </div>
      <div className="product-offer-status">
         Ожидается оплата
      </div>
      
       <hr/>
       <div className="order-price">{price}</div>
      
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
    onSendData();
  }}
                        color={color}
                        textColor={textColor}
                        text={`Купить за ${price}`}
                        />
  </>
  );
}

export default ProductPay;