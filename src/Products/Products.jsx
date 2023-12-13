import { useState, useEffect } from "react";
import "./css/item.css";
import productsData from "./productsData";
import { Link } from "react-router-dom";

const Products = () => {
  const [items, setItems] = useState(productsData);

  useEffect(() => {
    if (items.length) {
      const scrollPosition = sessionStorage.getItem('scrollPosition');
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
        sessionStorage.removeItem('scrollPosition');
      }
    }
  }, [items]);

  const products = items.map((product) => (
    <div className="item" key={product.id}>
      <Link 
        to={`/products/${product.id}`} 
        onClick={() => sessionStorage.setItem('scrollPosition', window.scrollY)}
      >
        <div className="item-img">
          <img src={product.img[0]} alt="" />
        </div>
        <div className="item-info">
          <h4>{product.price}₽</h4>
          <p>{product.name}</p>
          <button className="add-item">
            <div className="buy-item">Купить</div>
          </button>
        </div>
      </Link>
    </div>
  ));

  return (

      <main>{products}</main>
 
  );
};

export default Products;
