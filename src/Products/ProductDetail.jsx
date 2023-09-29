
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react"
import productsData from "./productsData";
import "./css/Product.css";
import SizeInfo from "./SizeInfo/SizeInfo";
import "./css/SelectSize.css";
import styled from "styled-components";
import PropTypes from 'prop-types';
import { MainButton } from "@twa-dev/sdk/react" 
import { useLocation } from 'react-router-dom';

const Size = styled.button`
  width: 62px;
  height: 62px;
  opacity: 0.6;
  background: white;
  border-radius: 25px;
  border: 0;
  outline: 0;
  border: 2px solid #e3e3e3;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  color: #ff0000;

  ${({ active }) =>
    active &&
    `
    border: 2px solid #6b6b6b;
    opacity: 1;
    
  `}
`;

function ProductDetail({ sendDataToParent, addToCart, onDataUpdate, dataFromMainButton }) {
  const { productId } = useParams();
  const [paymentData, setPaymentData] = useState(null);
  const thisProduct = productsData.find((prod) => prod.id === productId);
  const [active, setActive] = useState(paymentData ? paymentData.size : thisProduct.size[9]);
  const typesKeys = Object.entries(thisProduct.size);
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
    
  };

  const handlePaymentClick = () => {
    if (paymentData && paymentData.size) {
      // Вызываем функцию onDataUpdate, передавая ей данные
      onDataUpdate(paymentData.size, paymentData.price);
      navigate(`/products/confirm/${thisProduct.name}/${paymentData.size}/${paymentData.price}`, {
        state: { productData: paymentData }
      });
      sendDataToParent(paymentData); // Передаем данные в родительский компонент
      // Добавляем товар в корзину после оплаты
    addToCart(paymentData);
    } else {
      alert(`Напоминаем вам выбрать размер ${thisProduct.name} перед оплатой.`);
    }
  };

 

  ProductDetail.propTypes = {
    addToCart: PropTypes.func.isRequired,
    sendDataToParent: PropTypes.func.isRequired,
    // Другие PropTypes, если есть
  };

  return (
    <>
    <div className="full-item">
        <img src={"/img/img/" + thisProduct.img} alt="photo" />
        <h4 className="full-item-name">{thisProduct.name}</h4>

        <p className="full-item-price">{active}₽</p>

        <hr className="hr-line" />
        <SizeInfo />

        <div className="size_box">
          {typesKeys.map((item) => (
            <button className="size_button" key={item[0]}>
              <Size
                key={item}
                active={active === item[1]}
                onClick={() => handleAddToCard(item[1],item[0])} // Отвечает за вывод товара
              >
                <div className="Story-size-content">{item[0]}</div>
              </Size>
            </button>
          ))}
        </div>
        <hr className="hr-line" />
        {dataFromMainButton && (
  <MainButton 
      onClick={handlePaymentClick}
      color={color}
      textColor={textColor}
      text={text}
    />
)}
    </div>
    </>
  );
}

export default ProductDetail;
