import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./css/item.css";
import productsData from "./productsData";
import { Link } from "react-router-dom";

const Products = () => {
  const [items, setItems] = useState(productsData);
  const [hasMore, setHasMore] = useState(true);

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
    <InfiniteScroll
      dataLength={items.length}
      next={setItems}
      hasMore={hasMore}
      loader={<p>...</p>}
    >
      <main>{products}</main>
    </InfiniteScroll>
  );
};

export default Products;
