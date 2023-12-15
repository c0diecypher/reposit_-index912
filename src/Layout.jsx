import Banner from "./Components/Banner";
import BasketItem from "./Components/BasketItem";
import ButtonBonus from "./Components/ButtonBonus";
import Header from "./Components/Header";
import ModalWindow from "./ModalWindow";
import Catalog from "./Search/Catalog";
import Searchbar from "./Search/Search-bar";
import Stories from "./Stories/Stories";
import Footer from './Components/Footer'
import Products from "./Products/Products";
import { useState, useEffect } from "react";


function Layout({cart, onDataUpdate, dataFromMainButton}) {
    const [modalActive, setModalActive] = useState(false);
    const [modalProductId, setModalProductId] = useState(null);
    const openModal = (product) => { 
      setModalProductId(product);
      // Изменяем маршрут, чтобы открыть модальное окно с определенным productId
      window.history.pushState(null, `/`, `/products/${product.id}`);
      // Устанавливаем флаг modalActive в true
      setModalActive(true);
    };

    const closeModal = () => {
      setModalActive(false);
      setModalProductId(null);
      // Получаем текущий URL
      const currentURL = window.location.href;
      // Удаляем "/products/${productId}" из текущего URL
      const newURL = currentURL.replace(/\/products\/[0-9]+$/, "");
      // Заменяем текущий URL измененным URL
      window.history.replaceState(null, "", newURL);
    }
    
    useEffect(() => {
      const handlePopstate = () => {
        closeModal();
      };
  
      // Добавляем слушателя события popstate
      window.addEventListener("popstate", handlePopstate);
  
      // Убираем слушателя при размонтировании компонента
      return () => {
        window.removeEventListener("popstate", handlePopstate);
      };
    }, []);
  
  return (
    <>
            <ModalWindow 
            active={modalActive} 
            setActive={setModalActive} 
            closeModal={closeModal} 
            product={modalProductId} 
            onDataUpdate={onDataUpdate}
            dataFromMainButton={dataFromMainButton}
            />
            <Header />
                <Searchbar />
                <Stories />
                <ButtonBonus />
                <Banner />
                {cart.length > 0 && (
                <BasketItem 
                cart={cart}  />
                )}
                <Catalog />

                <Products 
                setModalActive={setModalActive} 
                openModal={openModal} />
                
                
            <Footer />
            

    </>
  )
}

export default Layout;
