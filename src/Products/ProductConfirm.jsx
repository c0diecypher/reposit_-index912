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

  useEffect(() => {
    // Функция для обновления статуса оплаты
    const updatePaymentStatus = async () => {
      try {
        const response = await fetch('https://zipperconnect.space/customer/settings/client/buy/offer/pay/webhook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        if (responseData.getPaymentStatus) {
          setPaymentStatus(responseData.getPaymentStatus);
        }
      } catch (error) {
        console.error('Ошибка обновления статуса оплаты:', error);
      }
    };

    // Вызываем функцию для обновления статуса каждые, например, 5 секунд
    const intervalId = setInterval(updatePaymentStatus, 5000);

    // Останавливаем интервал при размонтировании компонента
    return () => clearInterval(intervalId);
  }, []); // Пустой массив зависимостей гарантирует, что эффект запустится только после монтирования

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
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        if (responseData.message === 'OK') {
          if (responseData.paymentUrl) {
            Telegram.WebApp.openLink(responseData.paymentUrl);
          } else {
            console.error('Отсутствует ссылка для оплаты.');
          }
        } else {
          console.error(`Ошибка сервера: ${responseData.error}`);
        }
      })
      .catch((error) => {
        console.error('Ошибка отправки данных на сервер:', error);
      });
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
        {status && <p>Текущий статус: {status}</p>}
        <p>Статус оплаты: {paymentStatus}</p>
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
