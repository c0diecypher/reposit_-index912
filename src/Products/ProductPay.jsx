import "./css/Product.css";
import { useState, useEffect, useCallback } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Stories from "../Stories/Stories"
import { useTelegram } from "../Components/Hooks/useTelegram"
import { MainButton } from "@twa-dev/sdk/react"
import axios from 'axios';
import productsData from "../Products/productsData";

function ProductPay() {
  const { productId, size, price, name, img, id } = useParams();
  const location = useLocation();
  const [progress, setProgress] = useState(false);
  const [paymentDate] = useState(new Date()); // Создаем объект Date с текущей датой
  const options = { month: 'short', day: 'numeric' };
  // Декодируйте JSON-строку и преобразуйте ее в объект с данными о товаре
  const { productData } = location.state || {};

  // Отображаем информацию о товаре
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentData, setPaymentData] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [color] = useState(window.Telegram.WebApp.themeParams.button_color);
  const [textColor] = useState(
    window.Telegram.WebApp.themeParams.button_text_color
  );
  const navigate = useNavigate();
  const [paymentLink, setPaymentLink] = useState('');
  const {queryId, userId} = useTelegram();
  const [status, setStatus] = useState('');
   
 const onSendData = async () => {
  setProgress(true);
  const data = {
    name: productData.name,
    price: productData.price,
    size: productData.size,
    queryId,
    userId,
    order_id: productData.order_id,
    productId: productData.id,
    time: productData.time,
  };

  try {
    const response = await fetch('https://crm.zipperconnect.space/customer/settings/client/buy/offer/pay/basket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.paymentUrl) {
      Telegram.WebApp.openLink(responseData.paymentUrl);
      fetchPaymentData();
    } else {
      console.error('Отсутствует ссылка для оплаты.');
    }
  } catch (error) {
    console.error('Ошибка отправки данных на сервер:', error);
  }

  handleUpdatePayment();
};

  const fetchPaymentData = async () => {
    const data = {
    userId,
    order_id: productData.order_id,
  };
    try {
      const response = await axios.post("https://crm.zipperconnect.space/get/payment",data);
      setPaymentData(response.data.status);
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };
  
  useEffect(() => {
    const fetchDataInterval = setInterval(fetchPaymentData, 5000); // Интервал опроса сервера
    console.log(fetchDataInterval);
    // Инициализация данных при загрузке компонента
    fetchPaymentData();

    return () => {
      clearInterval(fetchDataInterval); // Очистка интервала при размонтировании компонента
    };
  }, []);

  const handleUpdatePayment = async () => {
    const data = {
    userId,
    order_id: productData.order_id,
  };
    try {
      const response = await axios.post("https://crm.zipperconnect.space/update/payment", data);
      setPaymentData(response.data.status);
      console.log(setPaymentData);
    } catch (error) {
      console.error("Error updating payment data:", error);
    }
  };
  const [dataOpen, setDataOpen] = useState(false);
  const handleEditClick = () => {
    setDataOpen(!dataOpen);
    window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
  };

  return (
    <>
    { showConfirmation ? (
    <>

    <div className="confirm-item" key={productData.id}>
      <div className="images-slider-wrapper">
        <div className="images-slider-images">
          <div className="images-slider-image-item">
            <div className="image-item-wrapper">
              <img src={productsData.find(item => item.id === productData.id)?.img[0]} alt="photo" />
            </div>
          </div>
          <div className="images-slider-image-item">
            <div className="image-item-wrapper">
              <img src={productsData.find(item => item.id === productData.id)?.img[1]} alt="photo" />
            </div>
          </div>
          <div className="images-slider-image-item">
            <div className="image-item-wrapper">
              <img src={productsData.find(item => item.id === productData.id)?.img[2]} alt="photo" />
            </div>
          </div>
          <div className="images-slider-image-item">
            <div className="image-item-wrapper">
              <img src={productsData.find(item => item.id === productData.id)?.img[3]} alt="photo" />
            </div>
          </div>
          <div className="images-slider-image-item">
            <div className="image-item-wrapper">
              <img src={productsData.find(item => item.id === productData.id)?.img[4]} alt="photo" />
            </div>
          </div>
          <div className="images-slider-image-item">
            <div className="image-item-wrapper">
              <img src={productsData.find(item => item.id === productData.id)?.img[5]} alt="photo" />
            </div>
          </div>
      </div>
    </div>
      
    <div className="bg-full-item-name">
      <div className="confirm-item-name">{productData.name}
        <span className="confirm-item-size" > размер {productData.size} EU</span>
      </div>
    </div>
    <div className="item-order-info">
      <div className="status-selection-steps-box">
        <div className="status-selection-step">
            <div className="status-selection-step-inner" style={{ color: 
                paymentData === 'PAID' ? '#31b545' :
                paymentData === 'CANCEL' ? '#b54531' :
                paymentData === 'WAIT' ? 'var(--tg-theme-hint-color)' :
                'var(--tg-theme-hint-color)' /* или любой другой цвет по умолчанию */
              }}>
              <svg viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m4.917 10 4.166 4.166 8.334-8.333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </div>
            <span className="status-selection-line"></span>
            <div className="status-selection-step-inner" style={{ color: 
                paymentData === 'SENT' ? '#31b545' :
                paymentData === 'CANCEL' ? '#b54531' :
                paymentData === 'WAIT' ? 'var(--tg-theme-hint-color)' :
                'var(--tg-theme-hint-color)' /* или любой другой цвет по умолчанию */
              }}>
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M33.333 12.5 20 5 6.667 12.5m26.666 0v15L20 35m13.333-22.5L20 20m0 15L6.667 27.5v-15M20 35V20M6.667 12.5 20 20m6.667-11.25-13.334 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </div>
            <span className="status-selection-line"></span>
            <div className="status-selection-step-inner" style={{ color: 
                paymentData === 'TRANSITCN' ? '#31b545' :
                paymentData === 'TRANSITRU' ? '#31b545' :
                paymentData === 'WAIT' ? 'var(--tg-theme-hint-color)' :
                'var(--tg-theme-hint-color)' /* или любой другой цвет по умолчанию */
              }}>
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 14.166a1.667 1.667 0 1 1-3.333 0m3.333 0a1.667 1.667 0 1 0-3.333 0m3.333 0h5m-8.333 0H2.5v-3.333m13.333 3.333a1.667 1.667 0 1 1-3.333 0m3.333 0a1.667 1.667 0 1 0-3.333 0m3.333 0H17.5v-5m-15.833-5h9.166v10m6.667-5h-6.667m6.667 0L15 5h-4.167M2.5 7.5h3.333" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
            <span className="status-selection-line"></span>
            <div className="status-selection-step-inner" style={{ color: 
                paymentData === 'DELIVERED' ? '#31b545' :
                paymentData === 'CANCEL' ? '#b54531' :
                paymentData === 'WAIT' ? 'var(--tg-theme-hint-color)' :
                'var(--tg-theme-hint-color)' /* или любой другой цвет по умолчанию */
              }}>
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.333 35V8.333a8.333 8.333 0 0 1 11.667 0 8.333 8.333 0 0 0 11.667 0v15a8.333 8.333 0 0 1-11.667 0 8.333 8.333 0 0 0-11.667 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </div>         
        </div>
      </div>
      <div className="product-offer-id">
       Заказ {productData.order_id}
      </div>
      <div className="product-offer-status">
      {paymentData === "WAIT" ? (
          <>Ожидается оплата</>
        ) : paymentData === "PAID" ? (
          <>Оплачено</>
        ) : paymentData === "SENT" ? (
          <>Готовится к отправке</>
        ) : paymentData === "TRANSITCN" ? (
          <>Доставка из Китая в пути</>
        ) : paymentData === "TRANSITRU" ? (
          <>В пути по России</>
        ) : paymentData === "DELIVERED" ? (
          <>Доставлен в пункт выдачи</>
        ) : (
          <>Загрузка...</>
        )}
      </div>
      
       <hr/>
       <div className="order-price">{productData.price}₽</div>
      </div>
    </div> 

    </>):(
      
    <>

        <div className="confirm-item" key={productData.id}>
      <div className="images-slider-wrapper">
        <div className="images-slider-images">
          <div className="images-slider-image-item">
            <div className="image-item-wrapper">
              <img src={productsData.find(item => item.id === productData.id)?.img[0]} alt="photo" />
            </div>
          </div>
          <div className="images-slider-image-item">
            <div className="image-item-wrapper">
              <img src={productsData.find(item => item.id === productData.id)?.img[1]} alt="photo" />
            </div>
          </div>
          <div className="images-slider-image-item">
            <div className="image-item-wrapper">
              <img src={productsData.find(item => item.id === productData.id)?.img[2]} alt="photo" />
            </div>
          </div>
          <div className="images-slider-image-item">
            <div className="image-item-wrapper">
              <img src={productsData.find(item => item.id === productData.id)?.img[3]} alt="photo" />
            </div>
          </div>
          <div className="images-slider-image-item">
            <div className="image-item-wrapper">
              <img src={productsData.find(item => item.id === productData.id)?.img[4]} alt="photo" />
            </div>
          </div>
          <div className="images-slider-image-item">
            <div className="image-item-wrapper">
              <img src={productsData.find(item => item.id === productData.id)?.img[5]} alt="photo" />
            </div>
          </div>
      </div>
    </div>
      
    <div className="bg-full-item-name">
      <div className="confirm-item-name">{productData.name}
        <span className="confirm-item-size" > размер {productData.size} EU</span>
      </div>
    </div>
    <div className="item-order-info">
      <div className="status-selection-steps-box">
        <div className="status-selection-step">
            <div className="status-selection-step-inner">
              <svg viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m4.917 10 4.166 4.166 8.334-8.333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </div>
            <span className="status-selection-line"></span>
            <div className="status-selection-step-inner" >
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M33.333 12.5 20 5 6.667 12.5m26.666 0v15L20 35m13.333-22.5L20 20m0 15L6.667 27.5v-15M20 35V20M6.667 12.5 20 20m6.667-11.25-13.334 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </div>
            <span className="status-selection-line"></span>
            <div className="status-selection-step-inner" >
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 14.166a1.667 1.667 0 1 1-3.333 0m3.333 0a1.667 1.667 0 1 0-3.333 0m3.333 0h5m-8.333 0H2.5v-3.333m13.333 3.333a1.667 1.667 0 1 1-3.333 0m3.333 0a1.667 1.667 0 1 0-3.333 0m3.333 0H17.5v-5m-15.833-5h9.166v10m6.667-5h-6.667m6.667 0L15 5h-4.167M2.5 7.5h3.333" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
            <span className="status-selection-line"></span>
            <div className="status-selection-step-inner">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.333 35V8.333a8.333 8.333 0 0 1 11.667 0 8.333 8.333 0 0 0 11.667 0v15a8.333 8.333 0 0 1-11.667 0 8.333 8.333 0 0 0-11.667 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </div>         
        </div>
      </div>
      <div className="product-offer-id">
       Заказ №{productData.order_id}
      </div>
       <hr/>
       <div className="order-price">{productData.price}₽</div>
      </div>
    </div> 
      
      <MainButton 
        onClick={() => {
        onSendData();
        setShowConfirmation(true);
        }}
                            color={color}
                            textColor={textColor}
                            text={`Купить за ${productData.price}`}
                            progress={progress}
      />
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
 </>
 );
}

export default ProductPay;
