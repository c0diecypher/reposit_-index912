
import '../css/modal.css';
import CustomBackButton from './CustomBackButton'
import { BackButton, MainButton } from "@twa-dev/sdk/react" 
function Confirm({ active, setActive, product, closeConfirm, closeModal }) {
  if (!active || !product) {
    // Add some logging to help identify the issue
    console.error('Confirm component not rendered. Active:', active, 'Product:', product);
    return null;
  }

  return (
    <> 
    <CustomBackButton closeConfirm={closeConfirm} closeModal={closeModal} />
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
