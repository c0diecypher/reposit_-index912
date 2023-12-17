
import '../css/modal.css';

function Confirm({ active, setActive, product, closeConfirm }) {
  if (!active || !product) {
    // Add some logging to help identify the issue
    console.error('Confirm component not rendered. Active:', active, 'Product:', product);
    return null;
  }

  return (
    <div className={active ? 'confirm active' : 'confirm'} onClick={() => closeConfirm()}>
      <div className="confirm__content" onClick={(e) => e.stopPropagation()}>
        <p>{product.id}</p>
        <p>{product.name}</p>
        <p>{product.order_id}</p>
        <p>{product.size}</p>
        <p>{product.price}</p>
        <p>{product.img}</p>
      </div>
    </div>
  );
}

export default Confirm;
