// CSS
import "./App.css"
import "bootstrap/dist/css/bootstrap.css";

// Components
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import Products from './Products/Products'
import ProductDetail from "./Products/ProductDetail"
import Searchbar from "./Search/Search-bar"
import Search from "./Search/Search"
import Stories from "./Stories/Stories"
import Catalog from "./Search/Catalog"
import SizeInfoDetails from "./Products/SizeInfo/SizeInfoDetails"
import BasketItem from "./Components/BasketItem"
import { useTelegram } from "./Components/Hooks/useTelegram"
import ProfilePage from "./Components/Telegram/ProfilePage";
// React 
import { Route, Routes } from "react-router-dom";
import { BackButton } from "@twa-dev/sdk/react" 
import { useState, useEffect, useCallback } from "react"
import ProductConfirm from "./Products/ProductConfirm"

function App() {
  useEffect(() => {
    window.scrollTo(0, 0); // Прокрутка вверх при загрузке страницы
  }, []);
  const handleSendData = useCallback((data) => {
    // Handle the data received from ProductConfirm here
    console.log("Data received in App.js:", data);
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const initDataString = hashParams.get('tgWebAppData');
        const initData = new URLSearchParams(hashParams.get('tgWebAppData'));
        console.log(исходные данные:, initDataString) 
        const headers = new Headers();
          // Преобразуем объект в строку JSON и добавляем в заголовок
          headers.append('Authorization', `twa-init-data ${initDataString}`);
      
          // Проверяем, если данные инициализации отсутствуют
        if (!initDataString) {
            throw new Error('Ooof! Something is wrong. Init data is missing');
          }
        const requestOptions = {
          method: 'POST',
          headers: headers,
        };

        const response = await fetch('https://zipperconnect.space/validate-initdata', requestOptions);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Ответ сервера:', data);
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Routes>
        <Route
        exact
        path="/"
        element={
          <div>
            {tg.expand()}
            {tg.enableClosingConfirmation()}

            <Header />
            <Searchbar />
            <Stories />
            {cart.length > 0 && (
              <BasketItem 
              cart={cart}  />
            )}
            <Catalog />
            <Products />
            <Footer />
          </div>
        }
        >

        </Route>
        <Route
        path="/profile/"
        element={
          <div>
            <BackButton />
            <ProfilePage />
          </div>
        }
        >
          
        </Route>
        <Route
        path="/products/:productId"
        element={
          <div>
            <BackButton />
            <ProductDetail
            addToCart={addToCart} 
            sendDataToParent={sendDataToParent}
            onDataUpdate={handleDataFromMainButton}
            dataFromMainButton={dataFromMainButton}
            
              />
              {dataFromMainButton}
          </div>
        }
        >
          
        </Route>
        <Route
        path="/products/confirm/:name/:size/:price"
        element={
          <div>
            <BackButton />
            <ProductConfirm/>
              
          </div>
        }
        >
          
        </Route>
        <Route
          path="/search"
          element={
            <>
              <BackButton />
              <Search />
            </>
          }
        ></Route>
        <Route
        path="/products/size/"
        element={
          <div>
          <BackButton />
          <SizeInfoDetails />
          </div>
        }
        >
          
        </Route>
      </Routes>
      
    </>
  )
}

export default App
