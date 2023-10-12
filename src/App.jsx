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
  const searchParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.substring(1)); // Убираем "#" в начале строки хеша

  // Извлечь параметры запуска из query-параметров
  const tgWebAppStartParam = searchParams.get('tgWebAppStartParam');

  // Извлечь параметры из хеша URL
  const tgWebAppVersion = hashParams.get('tgWebAppVersion');
  const initDataString = hashParams.get('tgWebAppData');
  const initData = new URLSearchParams(initDataString);

  console.log('tgWebAppStartParam:', tgWebAppStartParam);
  console.log('tgWebAppVersion:', tgWebAppVersion);

  // Обработка параметров инициализации (tgWebAppData) из хеша
  const query_id = initData.get('query_id');
  const user = JSON.parse(initData.get('user'));
  const auth_date = initData.get('auth_date');
  const hash = initData.get('hash');

  console.log('query_id:', query_id);
  console.log('user:', user);
  console.log('auth_date:', auth_date);
  console.log('hash:', hash);

  if (hash && auth_date && user && query_id) {
  fetch('https://zipperconnect.space/validate-init-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `twa-init-data ${initData}`,
    },
    body: JSON.stringify({ hash, auth_date, user, query_id }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Server Response:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
} else {
  console.error('Some parameters are missing or empty.');
}

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
