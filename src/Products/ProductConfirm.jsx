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
   const [dataChannel, setDataChannel] = useState(null);

    useEffect(() => {
        // Создаем WebRTC Data Channel при монтировании компонента
        const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
        const peerConnection = new RTCPeerConnection(configuration);
        const newChannel = peerConnection.createDataChannel('paymentChannel');

        newChannel.onopen = (event) => {
            console.log('WebRTC Data Channel is open');
            setDataChannel(newChannel); // Устанавливаем dataChannel в состоянии
        };

        newChannel.onmessage = (event) => {
            const paymentStatus = event.data;
            console.log('Payment Status:', paymentStatus);
            setStatus(paymentStatus); // Устанавливаем статус оплаты в состоянии
        };

        // Тут также можно настроить сигнализацию и установить соединение

        // Очистка и уничтожение WebRTC Data Channel при размонтировании компонента
        return () => {
            if (dataChannel) {
                dataChannel.close();
            }
        };
    }, []);
  
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
                    Telegram.WebApp.openLink(data.paymentUrl);
                    if (dataChannel) {
                        const newPaymentStatus = 'Payment Successful';
                        dataChannel.send(newPaymentStatus); // Отправляем обновление статуса через WebRTC
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
        {status && <p>Статус платежа: {status}</p>}
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
