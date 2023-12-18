import { useEffect, useState } from "react";
import { MainButton } from "@twa-dev/sdk/react" 
function Confirm({ active, setActive, product, closeConfirm, closeModal, openConfirm, navigate }) {

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
              <p>{product.id}</p>
              <p>{product.name}</p>
              <p>{product.order_id}</p>
              <p>{product.size}</p>
              <p>{product.price}</p>
              <p>{product.img}</p>
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
