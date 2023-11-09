import "./css/Product.css";
import { useState, useEffect, useCallback } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [paymentLink, setPaymentLink] = useState('');
  const {queryId, userId} = useTelegram();
  const [status, setStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const onSendData = () => {
  const data = {
    name: productData.name,
    price: productData.price,
    size: productData.size,
    queryId,
    userId,
    order_id: productData.order_id,
  };

  fetch('https://zipperconnect.space/customer/settings/client/buy/offer/pay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
            .then((data) => {
      if (data.paymentUrl) {
        // Открываем ссылку для оплаты в Telegram
        Telegram.WebApp.openLink(data.paymentUrl);

        // Если есть статус, обновляем состояние
        if (data.getPaymentStatus) {
          // Обновляем состояние с полученным статусом оплаты
          setStatus(data.getPaymentStatus);
        } else {
          console.error('Отсутствует статус оплаты.');
        }
      } else {
        console.error('Отсутствует ссылка для оплаты.');
      }
    })
    .catch((error) => {
      console.error('Ошибка отправки данных на сервер:', error);
    });
};

   useEffect(() => {
    // Создание соединения с сервером через WebSocket
    const socket = new WebSocket('wss://zipperconnect.space/customer/settings/client/buy/offer/pay/webhook');

    // Обработка события открытия соединения
    socket.addEventListener('open', (event) => {
      console.log('WebSocket connection opened');
    });

    // Обработка события получения сообщения от сервера
    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      console.log('Received message from server:', data);

      // Обновление статуса оплаты на клиенте
      setPaymentStatus(data.status);
    });

    // Обработка события закрытия соединения
    socket.addEventListener('close', (event) => {
      console.log('WebSocket connection closed');
    });

    // Закрытие соединения при размонтировании компонента
    return () => {
      socket.close();
    };
  }, []);

useEffect(() => {
  if (paymentLink) {
    Telegram.WebApp.openLink(paymentLink, { try_instant_view: true })
  }
}, [paymentLink]);

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
        {status && <p>Статус платежа: {status} и
          {paymentStatus}</p>}
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
