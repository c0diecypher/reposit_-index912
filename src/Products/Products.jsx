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

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<h4>Загрузка товаров...</h4>}
    >
      <main>
      {items.map((product) => (
        <div className="item" key={product.id}>
          <Link to={`/products/${product.id}`}>
            <div className="item-img">
              <img src={product.img[0]} alt="" />
            </div>
              <h4>{product.price}</h4>
              <p>{product.name}</p>
              <button className="add-item">
                <div className="buy-item">Купить</div>
              </button>
          </Link>
        </div>
      ))}
      </main>
    </InfiniteScroll>
  );
};

export default Products;
