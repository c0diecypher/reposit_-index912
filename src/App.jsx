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
  
  // Функция для уменьшения количества товара
  const decreaseQuantity = (productId, size) => {
    const updatedCart = cart.map((product) => {
      if (product.id === productId && product.size === size) {
        // Если это товар, который нужно уменьшить, уменьшаем его количество
        if (product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
      }
      return product;
    });
  
    setCart(updatedCart);
  };

  const removeFromCart = (productId, size) => {
    const updatedCart = cart.filter((product) => !(product.id === productId && product.size === size));
    setCart(updatedCart);
  };
  
  // Функция для отправки данных в родительский компонент
  const sendDataToParent = (productData) => {
    addToCart(productData);
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
              cart={cart} 
              removeFromCart={removeFromCart}
              decreaseQuantity={decreaseQuantity} />
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
              />
          </div>
        }
        >
          
        </Route>
        <Route
        path="/products/confirm/:name/:size/:price"
        element={
          <>
            <BackButton />
            <ProductConfirm />
              
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
