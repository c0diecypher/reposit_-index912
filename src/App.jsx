// CSS
import "./App.css"

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

// React 
import { Route, Routes } from "react-router-dom";
import { BackButton } from "@twa-dev/sdk/react" 
import { useState } from "react"
import ProductConfirm from "./Products/ProductConfirm"

function App() {

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

  const [dataFromMainButton, setDataFromMainButton] = useState(true); // Состояние для хранения данных из ProductDetail компонента

  // Функция для обработки данных из дочернего компонента
  const handleDataFromMainButton = (data) => {
    setDataFromMainButton(data); // Сохраняем данные в состоянииa
    // Выполняйте здесь другие действия с данными, если необходимо
  };



  return (
    <>
      <Routes>
        <Route
        exact
        path="/"
        element={
          <div className='wrapper'>
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
        path="/user/:hashid"
        element={
          <div>
            <BackButton />
            Profile user non found 404:/
              
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
          <>
            <BackButton />
            <ProductConfirm
            dataFromMainButton={dataFromMainButton}
            />
              {dataFromMainButton}
          </>
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
          <>
          <BackButton />
          <SizeInfoDetails />
          </>
        }
        >
          
        </Route>
      </Routes>
      
    </>
  )
}

export default App
