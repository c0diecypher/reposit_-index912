import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/item.css";
import axios from "axios";
import productsData from "./productsData";


const Products = ({openModal}) => {
  const [product, setProduct] = useState(productsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  

  useEffect(()=>{
    document.addEventListener('scroll',ScrollHandler);
    return function () {
      document.removeEventListener('scroll', ScrollHandler)
    }
  }, []);

  const ScrollHandler = (e) => {
    if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100){
      setFetching(true);
    }
  }
  
return (

    <main>
    {product.map((product) => (
      <div className="item" key={product.id} onClick={() => openModal(product)}>
        
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
    </div>
    ))}
    </main>
);
};

export default Products;
