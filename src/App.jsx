// CSS
import "./App.css"
import "bootstrap/dist/css/bootstrap.css";

// Components
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Products from './Products/Products';
import ProductDetail from "./Products/ProductDetail";
import Searchbar from "./Search/Search-bar";
import Search from "./Search/Search";
import Stories from "./Stories/Stories";
import Catalog from "./Search/Catalog";
import SizeInfoDetails from "./Products/SizeInfo/SizeInfoDetails";
import BasketItem from "./Components/BasketItem";
import { useTelegram } from "./Components/Hooks/useTelegram";
import ProfilePage from "./Components/Telegram/ProfilePage";
import ProductConfirm from "./Products/ProductConfirm";
import FilterProducts from "./Products/FilterProducts";
import SettingsProfile from "./Components/Telegram/SettingsProfile";
import ProductPay from "./Products/ProductPay";
import ProductPaid from "./Products/ProductPaid";
import BasketPaid from "./Components/BasketPaid";
import ButtonBonus from "./Components/ButtonBonus";
import BonusPage from "./Components/BonusPage";
import Banner from "./Components/Banner";
// React 
import { Route, Routes } from "react-router-dom";
import { BackButton } from "@twa-dev/sdk/react" 
import { useState, useEffect, useCallback } from "react"


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

  const [scrollPosition, setScrollPosition] = useState(0);

  // Сохраните текущее положение прокрутки при монтировании компонента
  useEffect(() => {
    setScrollPosition(window.scrollY);
  }, []);

  // Восстановите положение прокрутки при возврате на страницу Products
  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);
   const userIdString = userId.toString();

  // Проверка userId для определения, должен ли пользователь видеть баннер
  const shouldShowBanner = userIdString === '204688184' || userIdString === '1201116054';
  return (
    <>
      <Routes>
        <Route
        exact
        path="/"
        element={
            <>
              {Telegram.WebApp.setHeaderColor('secondary_bg_color')}
              {tg.expand()}
              {tg.enableClosingConfirmation()}
              {shouldShowBanner ? (
                <>
                  <Header userId={userId} />
                  <Searchbar />
                  <Stories />
                  {isAuthenticated && <ButtonBonus userId={userId} />}
                  {shouldShowBanner && <Banner userId={userId} />}
                  {isAuthenticated && <BasketItem userId={userId} />}
                  <div></div>
                  {isAuthenticated && <BasketPaid userId={userId} />}
                  <Catalog userId={userId} />
                  {isAuthenticated && <Products userId={userId} />}
                  <Footer />
                </>
              ) : (
                <img src="../public/img/svg/1586512296radial-stripes-background-freesvg.org.svg" alt="krossi"/>
              )}
            </>
          }
        >

        </Route>
        <Route
        path="/bonus/"
        element={
          <div>
            <BackButton />
            <BonusPage userId={userId} />
          </div>
        }
        >
          
        </Route>
        <Route
        path="/profile/"
        element={
          <div>
            <BackButton />
            {isAuthenticated && <ProfilePage userId={userId} />}
          </div>
        }
        >
          
        </Route>
        <Route
        path="/profile/settings"
        element={
          <div>
            <BackButton />
            {isAuthenticated && <SettingsProfile userId={userId}/>}
          </div>
        }
        >
          
        </Route>
        <Route
        path="/products/:productId"
        element={
          <div>
            <BackButton />
           {isAuthenticated && <ProductDetail
            addToCart={addToCart} 
            sendDataToParent={sendDataToParent}
            onDataUpdate={handleDataFromMainButton}
            dataFromMainButton={dataFromMainButton}
            isAuthenticated={isAuthenticated}
            userId={userId}
              />}
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
            {isAuthenticated && <ProductConfirm userId={userId}/>}
              
          </div>
        }
        >
          
        </Route>
        <Route
        path="/products/confirm/offer/:name/:size/:price"
        element={
          <div>
            <BackButton />
            {isAuthenticated && <ProductPay userId={userId}/>}
              
          </div>
        }
        >
          
        </Route>
        <Route
        path="/products/confirm/offer/paid/:name/:size/:price"
        element={
          <div>
            <BackButton />
            {isAuthenticated && <ProductPaid userId={userId}/>}
              
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
        <Route
        path="/filtered"
        element={
          <>
          <BackButton />
          {isAuthenticated &&<FilterProducts />}
          </>
        }
        >
          
        </Route>
      </Routes>
      
    </>
  )
}

export default App
