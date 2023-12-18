import { useEffect, useState } from "react";
import { MainButton } from "@twa-dev/sdk/react" 
import { useLocation } from "react-router-dom";

function Confirm({ active, setActive, product, closeConfirm, closeModal, openConfirm, navigate }) {
  const location = useLocation();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const locationState = location.state;
    if (locationState && locationState.productData) {
      setProductData(locationState.productData);
    }
  }, [location]);
  useEffect(() => {
    const handleBackButtonClick = () => {
      console.log('Back button clicked in Confirm');
      setActive(false);
      navigate(-1); // Вернуться на предыдущий маршрут
    };

    const backButton = Telegram.WebApp.BackButton;

    if (active) {
      backButton.show().onClick(handleBackButtonClick);
    } else {
      backButton.hide().offClick(() => {
        console.log('Back button click handler removed in Confirm');
      });
    }

    return () => {
      console.log('Cleaning up back button in Confirm');
      backButton.hide().offClick(() => {
        console.log('Back button click handler removed during cleanup in Confirm');
        setActive(false);
      });
    };

  }, [active, setActive, navigate]);

  if (!active || !product) {
    console.error('Confirm component not rendered. Active:', active, 'Product:', product);
    return null;
  }

  const [color] = useState(window.Telegram.WebApp.themeParams.button_color);
  const [textColor] = useState(
    window.Telegram.WebApp.themeParams.button_text_color
  );
  const [text] = useState(`Купить за ${product.price}`);
  const Payment = () => {
    console.log('payment click');
  };

  return (
    <>
      {active && (
        <>
          <div className={active ? 'confirm active' : 'confirm'}>
            <div className="confirm__content" onClick={(e) => e.stopPropagation()}>
              <p>{productData?.id}</p>
            <p>{productData?.name}</p>
            <p>{productData?.order_id}</p>
            <p>{productData?.size}</p>
            <p>{productData?.price}</p>
            <p>{productData?.img}</p>
            </div>
          </div>
          {active && (
            <MainButton 
              onClick={Payment}
              text={text}
              color={color}
              textColor={textColor}
            />
          )}
        </>
      )}
    </>
  );
}

export default Confirm;
