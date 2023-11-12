import "./css/Product.css";
import { useState, useEffect, useCallback } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Stories from "../Stories/Stories"
import { useTelegram } from "../Components/Hooks/useTelegram"
import { MainButton } from "@twa-dev/sdk/react"

function ProductConfirm() {
  const { productId, size, price, name, img } = useParams();
  const location = useLocation();
  

  // Декодируйте JSON-строку и преобразуйте ее в объект с данными о товаре
  const { productData } = location.state || {};

  // Отображаем информацию о товаре
  const [paymentStatus, setPaymentStatus] = useState('');
  const [color] = useState(window.Telegram.WebApp.themeParams.button_color);
  const [textColor] = useState(
    window.Telegram.WebApp.themeParams.button_text_color
  );
  const navigate = useNavigate();
  const [paymentLink, setPaymentLink] = useState('');
  const {queryId, userId} = useTelegram();
  const [status, setStatus] = useState('');
  const onSendData = () => {
  const data = {
    name: productData.name,
    price: productData.price,
    size: productData.size,
    queryId,
    userId,
    order_id: productData.order_id,
  };

  fetch('https://crm.zipperconnect.space/customer/settings/client/buy/offer/pay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.paymentUrl && data.getPaymentStatus) {
          Telegram.WebApp.openLink(data.paymentUrl);
          setPaymentStatus('Ожидается оплата');

        } else {
        console.error('Отсутствует ссылка для оплаты.');
      }
    })
    .catch((error) => {
      console.error('Ошибка отправки данных на сервер:', error);
    });
};

  
const checkPaymentStatus = async () => {
  try {
    // Здесь отправляете запрос на сервер для проверки статуса платежа
    const response = await fetch('https://crm.zipperconnect.space/customer/client/pay/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(/* Здесь передайте необходимые данные для проверки статуса, например, id и apikey */),
    });

    if (response.ok) {
      // Если статус успешен и пришли все данные, обновите состояние
      setPaymentStatus('Оплачен');
    } else {
      // Если статус не успешен или данные не пришли, обновите состояние, например, на "Отменен" или "Ожидается оплата"
      setPaymentStatus('Отменен');
    }
  } catch (error) {
    console.error('Ошибка при проверке статуса платежа', error);
    // Обработка ошибки, например, обновление состояния на "Ошибка"
    setPaymentStatus('Ошибка');
  }
};

  const [dataOpen, setDataOpen] = useState(false);
  const handleEditClick = () => {
    setDataOpen(!dataOpen);
    window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
  };

  return (
    <>
    { paymentStatus ? (
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
            <div className="status-selection-step-inner" style={{ color: 
                paymentStatus === 'Отмена' ? '#b54531' :
                paymentStatus === 'Оплачен' ? '#31b545' :
                paymentStatus === 'Ожидается оплата' ? 'var(--tg-theme-hint-color)' :
                'initial' /* или любой другой цвет по умолчанию */
              }}>
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
      { paymentStatus ? paymentStatus : ''}
      </div>
      
       <hr/>
       <div className="order-price">{price}₽</div>
      </div>
    </div>
    </>):(
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
          <span className="confirm-item-size" > размер {size} US</span>
        </div>
        </div>
          <div className="item-order-info">
            <div className="confirm-item-price">
              {price}₽
            </div>
            <div className="public-oferta">
              <p className="public-ofert-text">Оплачивая заказ, вы соглашаетесь <br/>с условиями <a className="public-oferta-link">публичной оферты</a></p>
            </div>
          <hr/>
          </div>
      </div>
    </>
    )}
    
  <div className="help-ful">
    <h2 className="help-title">Полезная информация</h2>
    <div className="help-stories">
    <Stories />
    </div>
  </div>
  <div className="profile-data" onClick={handleEditClick}>
    <div className='order-card-box'>
    {dataOpen ? (
      <>
      <div className="order-card-title">Доставка</div>
      <div className="order-card-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-chevron-down"><path d="M6 9l6 6l6 -6"></path></svg>
      </div>
      </>):(
        <>
        <div className="order-card-title">Доставка</div>
      <div className="order-card-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-chevron-up"><path d="M6 15l6 -6l6 6"></path></svg>
      </div>
        </>
      )}
                    
                    <span style={{marginLeft: '5px'}}></span>
                </div>
  {dataOpen ? (<div>
            
          
             </div>):(<><div className="order-card-text">
                <span style={{marginTop: '12px', textAlign:'left'}}>Среднее время доставки 16-20 дней. <br/> 
                После оплаты вы сможете отслеживать статусы доставки и получать уведомления об их изменении.<br/> 
                </span>
              </div>
              </>)}
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

export default ProductConfirm;
