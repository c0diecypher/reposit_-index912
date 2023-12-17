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
import HomeBackButton from './Products/HomeBackButton'

function Layout({cart, onDataUpdate, dataFromMainButton, userId}) {
    const [modalActive, setModalActive] = useState(false);
    const [modalProductId, setModalProductId] = useState(null);
    const openModal = (product) => { 
      setModalProductId(product);
      // Изменяем маршрут, чтобы открыть модальное окно с определенным productId
      window.history.pushState(null, `/`, `/products/${product.id}`);
      // Устанавливаем флаг modalActive в true
      setModalActive(true);
        document.body.classList.add("product-detail");
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
        window.history.replaceState(null, "", window.location.pathname);
        document.body.classList.remove("product-detail");
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
      {modalActive ? (<>
          <HomeBackButton closeModal={closeModal}/>
          <ModalWindow 
            active={modalActive} 
            setActive={setModalActive} 
            closeModal={closeModal} 
            product={modalProductId} 
            onDataUpdate={onDataUpdate}
            dataFromMainButton={dataFromMainButton}
            />
          </>)}
         <Header userId={userId}/>
                <Searchbar userId={userId}/>
                <Stories userId={userId} />
                <ButtonBonus userId={userId} />
                <Banner userId={userId}/>
                {cart.length > 0 && (
                <BasketItem 
                cart={cart}
                userId={userId}
                />
                )}
                <Catalog userId={userId} />

                <Products 
                setModalActive={setModalActive} 
                openModal={openModal} 
                userId={userId}/>
                
                
            <Footer />
            
            

    </>
  )
}

export default Layout;
