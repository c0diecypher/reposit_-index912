// CSS
import "./App.css"
import "bootstrap/dist/css/bootstrap.css";

import { useTelegram } from "./Components/Hooks/useTelegram";
import { Route, Routes, useNavigate } from "react-router-dom";
import { BackButton } from "@twa-dev/sdk/react" 
import { useState, useEffect, useCallback, useRef } from "react"


function App() {
  
  const handleSendData = useCallback((data) => {
    // Handle the data received from ProductConfirm here
    // console.log("Data received in App.js:", data);
  }, []);
  const { tg } = useTelegram();
  // Состояние корзины
  const [cart, setCart] = useState([]); 
  // Функция для добавления или увеличения количества товара
  const addToCart = (productData) => {
    const existingProduct = cart.find((product) => product.id === productData.id && product.size === productData.size);
  
    if (existingProduct) {
      // Если товар уже есть в корзине, увеличиваем его количество
      const updatedCart = cart.map((product) =>
        product.id === productData.id && product.size === productData.size
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      setCart(updatedCart);
    } else {
      // Если товара нет в корзине, добавляем его с начальным количеством 1
      setCart([...cart, { ...productData, quantity: 1 }]);
    }
  };
  
  // Функция для отправки данных в родительский компонент
  const sendDataToParent = (paymentData) => {
    addToCart(paymentData);
  };

  const [dataFromMainButton, setDataFromMainButton] = useState(true); // Состояние для хранения данных из дочернего компонента

  // Функция для обработки данных из дочернего компонента
  const handleDataFromMainButton = (data) => {
    setDataFromMainButton(data); // Сохраняем данные в состоянии
    // Выполняйте здесь другие действия с данными, если необходимо
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState('');
 useEffect(() => {
    const fetchData = async () => {
      try {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const initDataString = hashParams.get('tgWebAppData');
        const initData = new URLSearchParams(hashParams.get('tgWebAppData'));
        
        const userMatch = /user=([^&]+)/.exec(initDataString);
          if (userMatch) {
          const userString = userMatch[1];
          const user = JSON.parse(decodeURIComponent(userString));
        
          // Проверяем, что пользователь имеет свойство "id"
          if (user && user.id) {
            const userId = user.id.toString();
            setUserId(userId);
            
          }
        }
        
        const headers = new Headers();
          // Преобразуем объект в строку JSON и добавляем в заголовок
          headers.append('Authorization', `twa-init-data ${initDataString}`);
          // Проверяем, если данные инициализации отсутствуют
        if (!initDataString) {
            throw new Error('Unauthorized');
          }
        const requestOptions = {
          method: 'POST',
          headers: headers,
        };

        const response = await fetch('https://cdn.zipperconnect.space/validate-initdata', requestOptions);
         setIsAuthenticated(true);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        //console.log(data);
      } catch (error) {
        //console.error(error);
      }
    };

    fetchData();
  }, []);

  
   const userIdString = userId.toString();

  // Проверка userId для определения, должен ли пользователь видеть баннер
  const shouldShowBanner = userIdString === '204688184' || userIdString === '1201116054';
  return (
    <>
              {shouldShowBanner ? (
                <>
                 <AppRouter 
      cart={cart} 
      addToCart={addToCart} 
      onDataUpdate={handleDataFromMainButton}
      sendDataToParent={sendDataToParent} 
      dataFromMainButton={dataFromMainButton} 
      handleDataFromMainButton={handleDataFromMainButton}
      userId={userId}
      />
                </>
              ) : (
                <img srcSet="../img/svg/3490162309597233219.webp" alt="krossi"/>
              )}

        
    </>
  )
}

export default App
