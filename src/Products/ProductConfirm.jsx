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
  const [paymentStatus, setPaymentStatus] = useState('Ожидается оплата');
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
      // Если статус успешен, обновите состояние
      setPaymentStatus('Оплачен');
    } else {
      // Если статус не успешен, обновите состояние, например, на "Отменен"
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
        {paymentStatus && <p>Текущий статус: {paymentStatus}</p>}
        <p className="public-ofert-text">Оплачивая заказ, вы соглашаетесь <br/>с условиями <a className="public-oferta-link">публичной оферты</a></p>
      </div>
       <hr/>
      </div>
  </div>
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
