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
import { useState, useEffect, useCallback } from "react";
import HomeBackButton from './Products/HomeBackButton'
import { BackButton } from "@twa-dev/sdk/react"; 

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

    const closeModal = useCallback(() => {
      setModalActive(false);
      setModalProductId(null);
      // Заменяем текущий URL измененным URL
      document.body.classList.remove("product-detail");
    }, [setModalActive, setModalProductId]);

    // Effect to show/hide the BackButton based on modalActive state
    useEffect(() => {
  const backButton = Telegram.WebApp.BackButton;

  if (modalActive) {
    console.log('Showing back button');
    backButton.show().onClick(() => {
      console.log('Back button clicked');
      closeModal();
    });
  } else {
    console.log('Hiding back button');
    backButton.hide().offClick(() => {
      console.log('Back button click handler removed');
      closeModal();
    });
  }

  // Clean up the event handler when the component unmounts
  return () => {
    console.log('Cleaning up back button');
    backButton.hide().offClick(() => {
      console.log('Back button click handler removed during cleanup');
      closeModal();
    });
  };
}, [modalActive, closeModal]);

    return (
      <>
        {modalActive && (<>
          
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
          userId={userId}
        />
        <Footer />
      </>
    );
}

export default Layout;
