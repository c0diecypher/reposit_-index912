import "./css/modal.css"
import "./Products/css/Product.css";
import PropTypes from 'prop-types';

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import productsData from "./Products/productsData";
import "./Products/css/Product.css";
import SizeInfo from "./Products/SizeInfo/SizeInfo";
import "./Products/css/SelectSize.css";
import styled from "styled-components";
import Stories from "./Stories/Stories"

const Size = styled.button`
  display: flex;
  flex-direction: column;
  min-width: 60px;
  
  opacity: 0.6;
  background: var(--tg-bg);
  border-radius: 10px;
  outline: 0;
  border: 1px solid var(--tg-text);
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  color: var(--tg-text);
  flex-shrink: 0;

  ${({ select }) =>
  select &&
    `
    border-color: var(--button-color);
    opacity: 1;
    
  `}
`;

function ModalWindow({active, product, closeModal,  sendDataToParent, addToCart, onDataUpdate }) {

  ModalWindow.propTypes = {
    active: PropTypes.bool.isRequired,
    product: PropTypes.object.isRequired, // Замените 'object' на ожидаемый тип вашего объекта продукта
    closeModal: PropTypes.func.isRequired,
  };

  if (!product) {
    return null; // or provide some default behavior
  }
  const [paymentData, setPaymentData] = useState(null);
  const thisProduct = productsData.find((prod) => prod.id === product.id);
  const [select, setSelect] = useState(paymentData ? paymentData : thisProduct.size[0]);
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

 useEffect(() => {
  if (thisProduct && thisProduct.size && thisProduct.price) {
    const priceWithoutCurrency = thisProduct.price.replace(/\D/g, '');

    // Найдем размер, соответствующий цене
    const matchingSize = Object.keys(thisProduct.size).find((size) => {
      const sizePriceWithoutCurrency = thisProduct.size[size].replace(/\D/g, '');
      return sizePriceWithoutCurrency === priceWithoutCurrency;
    });

    if (matchingSize) {
      setSelect(matchingSize);
      setPaymentData({
        size: matchingSize,
        name: thisProduct.name,
        img: thisProduct.img,
        price: thisProduct.size[matchingSize],
        id: thisProduct.id
      });
    }
  }
}, [thisProduct]);
  
  const handleAddToCard = (price, size, name, img) => {
    setSelect(size);
    const productData = {
      size,
      id: thisProduct.id,
      name: thisProduct.name,
      img: thisProduct.img,
      price,
      id: thisProduct.id
    };


    setPaymentData({
      size,
      name: thisProduct.name,
      img: thisProduct.img,
      price,
      id: thisProduct.id
    });

    if (size) {
      // Вызываем тактильную обратную связь при успешном выборе размера
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    } else {
      // Вызываем тактильную обратную связь с типом "error", когда размер не выбран
      window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');
    }
    
  };

  const generateOrderId = () => {
    const randomId = Math.floor(0 + Math.random() * 9999999); // Генерируйте случайное шестизначное число
    return `${randomId}`;
  };
  
  const handlePaymentClick = () => {
    const uniqueOrderId = generateOrderId();
    if (paymentData && paymentData.size) {
      // Вызываем функцию onDataUpdate, передавая ей данные
      onDataUpdate(paymentData.size, paymentData.price, paymentData);
      navigate(`/products/confirm/${thisProduct.name}/${paymentData.size}/${paymentData.price}`, {
        state: { productData: { ...paymentData, order_id: uniqueOrderId } }
      });
      sendDataToParent({ ...paymentData, order_id: uniqueOrderId });  // Передаем данные в родительский компонент
      // Добавляем товар в корзину после оплаты
     addToCart({ ...paymentData, order_id: uniqueOrderId });
    } else {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');
    }
  };


return (
  <>
  {active && (
    <div className={active ? "modal active": "modal"} onClick={() => closeModal()}>
      <div className="modal__content" onClick={e => e.stopPropagation()}>
      <div className="full-item" key={thisProduct.id} >
       <div className="images-slider-wrapper">
        <div className="images-slider-images">
        {thisProduct.img.map((image, index) => (
              <div className="images-slider-image-item" key={index}>
                <div className="image-item-wrapper">
                  <img src={image} alt={`photo-${index}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
        
       </div>
       <div className="bg-full-item-name">
        <div className="full-item-name">{thisProduct.name}
        </div>
        </div>
        <div className="item-order-info">
        <p className="full-item-price">{select !== null ? thisProduct.size[select] : ''}</p>
        <hr/>
        <SizeInfo />

        <div className="size_box">
          {typesKeys.map((item) => (
            <button className="size_button" key={item[0]}>
              <Size
                key={item}
                select={select === item[0]}
                onClick={() => handleAddToCard(item[1],item[0])} // Отвечает за вывод товара
              >
                <div className="Story-size-content">
                   <div className="size-nubmer" >{item[0]}</div>
                  <div className="size-price">{item[1]}</div>
                </div>
                
              </Size>
            </button>
          ))}
        </div>
        <hr/>
       
      <button
      onClick={handlePaymentClick}
      color={color}
      
      >
      </button>
      
        

      </div>
    
    <div className="help-ful">
    <h2 className="help-title">Полезная инофрмация</h2>
    <div className="help-stories">
    <Stories />
    </div>
  </div>
      </div>
      </div>

          
          )}
  </>
  
)
}

export default ModalWindow;
