
import '../css/modal.css';
import CustomBackButton from './CustomBackButton'
import { BackButton, MainButton } from "@twa-dev/sdk/react" 
import { useEffect } from "react";

function Confirm({ active, setActive, product, closeConfirm, closeModal, openConfirm }) {
  useEffect(() => {
    const backButton = Telegram.WebApp.BackButton;

    if (active) {
      backButton.show().onClick(() => {
        console.log('Back button clicked in Confirm');
        closeConfirm();
      });
    } else {
      backButton.hide().offClick(() => {
        console.log('Back button click handler removed in Confirm');
        closeConfirm();
      });
    }

    return () => {
      console.log('Cleaning up back button in Confirm');
      backButton.hide().offClick(() => {
        console.log('Back button click handler removed during cleanup in Confirm');
        closeConfirm();
      });
    };
  }, [active, closeConfirm, product]);

  if (!active || !product) {
    console.error('Confirm component not rendered. Active:', active, 'Product:', product);
    return null;
  }

  return (
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
      </>
  );
}

export default Confirm;
