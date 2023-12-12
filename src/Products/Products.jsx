import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./css/item.css";
import productsData from "./productsData";
import { Link } from "react-router-dom";

const Products = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 10;
  const [startIndex, setStartIndex] = useState(0);

  const loadMore = () => {
    if (startIndex < productsData.length) {
      const newItems = productsData.slice(startIndex, startIndex + itemsPerPage);
      setItems([...items, ...newItems]);
      setStartIndex(startIndex + itemsPerPage);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    if (items.length) {
      const scrollPosition = sessionStorage.getItem('scrollPosition');
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
        sessionStorage.removeItem('scrollPosition');
      }
    }
  }, [items]);
  

    const products = productsData.map((product) => (
      <div className="item" key={product.id}>
          <Link to={`/products/${product.id}`}>
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
