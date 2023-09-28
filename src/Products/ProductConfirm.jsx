import "./css/Product.css";

import { useParams, useLocation } from "react-router-dom";

function ProductConfirm() {
  const { productId, size, price, name, img } = useParams();
  const location = useLocation();
  

  // Декодируйте JSON-строку и преобразуйте ее в объект с данными о товаре
  const { productData } = location.state || {};

  // Отображаем информацию о товаре
  return (
    <>
    <div className="full-item" key={productId}>
    <img src={"/img/img/" + productData.img} alt="photo" />
    <h4 className="full-item-name">{productData.name}</h4>
    <span className="full-item-price"> {price} ₽</span>
    <span className="full-item-price-order">
         Размер
      <span className="full-item-size">
        <b>{size}</b>
      </span>
    </span>
  </div>
  </>
  );
}

export default ProductConfirm;
