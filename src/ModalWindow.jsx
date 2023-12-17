import "./css/modal.css"
import "./Products/css/Product.css";
import PropTypes from 'prop-types';
import { MainButton } from "@twa-dev/sdk/react" 
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react"
import productsData from "./Products/productsData";
import "./Products/css/Product.css";
import SizeInfo from "./Products/SizeInfo/SizeInfo";
import "./Products/css/SelectSize.css";
import styled from "styled-components";
import Stories from "./Stories/Stories"
import { BackButton } from "@twa-dev/sdk/react" 
import ProductConfirm from "./Products/ProductConfirm";
import Confirm from './Products/Confirm'
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

function ModalWindow({active, product, closeModal,  sendDataToParent, addToCart, onDataUpdate, dataFromMainButton }) {
  if (!product) {
    return null; // or provide some default behavior
  }
  ModalWindow.propTypes = {
    active: PropTypes.bool.isRequired,
    product: PropTypes.object.isRequired, // Замените 'object' на ожидаемый тип вашего объекта продукта
    closeModal: PropTypes.func.isRequired,
  };

  
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
        id: thisProduct.id,
        order_id: generateOrderId
      });
    }
  }
}, [thisProduct]);
  
  const handleAddToCard = (price, size, generateOrderId) => {
    setSelect(size);
    const productData = {
      size,
      id: thisProduct.id,
      name: thisProduct.name,
      img: thisProduct.img,
      price,
      order_id: generateOrderId
    };


    setPaymentData({
      size,
      name: thisProduct.name,
      img: thisProduct.img,
      price,
      id: thisProduct.id,
      order_id: generateOrderId
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
      navigate(`/products/confirm/${paymentData.name}/${paymentData.size}/${paymentData.price}`, {
        state: { productData: { ...paymentData, order_id: uniqueOrderId } }
      });
      sendDataToParent({ ...paymentData, order_id: uniqueOrderId });  // Передаем данные в родительский компонент
      // Добавляем товар в корзину после оплаты
     addToCart({ ...paymentData, order_id: uniqueOrderId });
    } else {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');
    }
  };
  const [openConfirm, setOpenConfirm] = useState(false);
  const handleOpenConfirm = () => {
    const uniqueOrderId = generateOrderId();
    setOpenConfirm(true);
    
  };

  const closeConfirm = useCallback(() => {
    setOpenConfirm(false);
    document.body.classList.remove("product-confirm");
  }, [setOpenConfirm, product.id]);

  useEffect(() => {
    const handlePopstate = () => {
      if (openConfirm) {
        closeConfirm();
        
      }
    };

    window.addEventListener('popstate', handlePopstate);
    
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [openConfirm, closeConfirm]);

  

return (
  <>
  <BackButton />
  {active && (
    <>
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
       
      {dataFromMainButton && (
      <MainButton 
      onClick={handleOpenConfirm}
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
      </div>
      </div>
      {openConfirm && (
        <>
        <BackButton onClick={() => closeConfirm()}/>
      <Confirm active={openConfirm} setActive={setOpenConfirm} closeConfirm={closeConfirm} product={paymentData}/>
      </>
      )}
          </>
          )}
          
          
  </>
  
)
}

export default ModalWindow;
