
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import productsData from "./productsData";
import "./css/Product.css";
import SizeInfo from "./SizeInfo/SizeInfo";
import "./css/SelectSize.css";
import styled from "styled-components";
import PropTypes from 'prop-types';
import { MainButton } from "@twa-dev/sdk/react" 
import { useLocation } from 'react-router-dom';
import Stories from "../Stories/Stories"
const availableSizes = Object.keys(thisProduct.size);
const defaultSize = availableSizes[0]; // Берем первое доступное значение размера
const Size = styled.button`
  display: flex;
  flex-direction: column;
  min-width: 60px;
  
  opacity: 0.6;
  background: white;
  border-radius: 10px;
  border: 0;
  outline: 0;
  border: 1px solid var(--background-secondary);
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  color: #ff0000;
  flex-shrink: 0;

  ${({ active }) =>
    active &&
    `
    border-color: var(--button-color);
    opacity: 1;
    
  `}
`;

function ProductDetail({ sendDataToParent, addToCart, onDataUpdate, dataFromMainButton, isAuthenticated }) {
  
  useEffect(() => {
    window.scrollTo(0, 0); // Прокрутка вверх при загрузке страницы
  }, []);
  const { productId } = useParams();
  const [paymentData, setPaymentData] = useState(null);
  const thisProduct = productsData.find((prod) => prod.id === productId);
  const [active, setActive] = useState(paymentData ? paymentData : thisProduct.size[defaultSize]);
  const typesKeys = Object.entries(thisProduct.size);

// Функция сортировки для упорядочивания размеров в правильном порядке
const customSort = (a, b) => {
  const numA = parseFloat(a[0]);
  const numB = parseFloat(b[0]);

  // Сравниваем числа
  return numA - numB;
};

// Сортируем typesKeys с использованием нашей функции сортировки
typesKeys.sort(customSort)

  const [color] = useState(window.Telegram.WebApp.themeParams.button_color);
  const [textColor] = useState(
    window.Telegram.WebApp.themeParams.button_text_color
  );
  const [text] = useState("Перейти к оплате");
  const navigate = useNavigate();
  // Функция для добавления товара в корзину
  const handleAddToCard = (price, size, name, img) => {
    setActive(price);
    const productData = {
      size,
      id: thisProduct.id,
      name: thisProduct.name,
      img: thisProduct.img,
      price
    };


    setPaymentData({
      size,
      name: thisProduct.name,
      img: thisProduct.img,
      price
    });

    if (size) {
      // Вызываем тактильную обратную связь при успешном выборе размера
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    } else {
      // Вызываем тактильную обратную связь с типом "error", когда размер не выбран
      window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');
    }
    
  };

  const handlePaymentClick = () => {
    if (paymentData && paymentData.size) {
      // Вызываем функцию onDataUpdate, передавая ей данные
      onDataUpdate(paymentData.size, paymentData.price, paymentData);
      navigate(`/products/confirm/${thisProduct.name}/${paymentData.size}/${paymentData.price}`, {
        state: { productData: paymentData }
      });
      sendDataToParent(paymentData); // Передаем данные в родительский компонент
      // Добавляем товар в корзину после оплаты
    addToCart(paymentData);
    } else {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');
    }
  };

 

  ProductDetail.propTypes = {
    addToCart: PropTypes.func.isRequired,
    sendDataToParent: PropTypes.func.isRequired,
    // Другие PropTypes, если есть
  };

  const handleSizePriceClick = () => {
    if (isAuthenticated) {
      window.alert(item[1]);
      window.alert(active);
    } else {
      window.alert("Не санкционированный вход");
    }
  }

  return (
    <>
    <div className="full-item">
        <div className="images-slider-wrapper">
        <div className="images-slider-images">
          <div className="images-slider-image-item">
            <div className="image-item-wrapper">
              <img src={thisProduct.img[0]} alt="photo" />
            </div>
          </div>
          <div className="images-slider-image-item">
            <div className="image-item-wrapper">
              <img src={thisProduct.img[1]} alt="photo" />
            </div>
          </div>
          <div className="images-slider-image-item">
            <div className="image-item-wrapper">
              <img src={thisProduct.img[2]} alt="photo" />
            </div>
          </div>
          <div className="images-slider-image-item">
            <div className="image-item-wrapper">
              <img src={thisProduct.img[3]} alt="photo" />
            </div>
          </div>
          <div className="images-slider-image-item">
            <div className="image-item-wrapper">
              <img src={thisProduct.img[4]} alt="photo" />
            </div>
          </div>
          <div className="images-slider-image-item">
            <div className="image-item-wrapper">
              <img src={thisProduct.img[5]} alt="photo" />
            </div>
          </div>
        </div>
       </div>
        <h4 className="full-item-name">{thisProduct.name}</h4>

        {isAuthenticated && <p className="full-item-price">{active}</p>}

        <hr/>
        <SizeInfo />

        <div className="size_box">
          {typesKeys.map((item) => (
            <button className="size_button" key={item[0]}>
              <Size
                key={item}
                active={active === item[1]}
                onClick={() => handleAddToCard(item[1],item[0])} // Отвечает за вывод товара
              >
                <div className="Story-size-content">
                   <div className="size-nubmer" >{item[0]}</div>
                  {isAuthenticated && <div className="size-price" onClick={handleSizePriceClick}>{item[1]}</div>}
                </div>
                
              </Size>
            </button>
          ))}
        </div>
        <hr/>
        {dataFromMainButton && (
      <MainButton 
      onClick={handlePaymentClick}
      text={text}
      color={color}
      textColor={textColor}
      />
      
        
)}

    </div>
    <div className="help-ful">
    <h2 className="help-title">Полезная инофрмация</h2>
    <div className="help-stories">
    <Stories />
    </div>
  </div>
    </>
  );
}

export default ProductDetail;
