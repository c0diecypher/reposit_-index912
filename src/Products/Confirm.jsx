
import '../css/modal.css';
import CustomBackButton from './CustomBackButton'
import { BackButton, MainButton } from "@twa-dev/sdk/react" 
function Confirm({ active, setActive, product, closeConfirm, closeModal, openConfirm }) {
  if (!active || !product) {
    // Add some logging to help identify the issue
    console.error('Confirm component not rendered. Active:', active, 'Product:', product);
    return null;
  }

  useEffect(() => {
  const backButton = Telegram.WebApp.BackButton;

  if (openConfirm) {
    console.log('Showing back button');
    backButton.show().onClick(() => {
      console.log('Back button clicked');
      closeConfirm();
    });
  } else {
    console.log('Hiding back button');
    backButton.hide().offClick(() => {
      console.log('Back button click handler removed');
      closeConfirm();
    });
  }

}, [openConfirm, closeConfirm]);

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
