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


function Layout({cart, onDataUpdate, dataFromMainButton, userId}) {

  return (
    <>
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
