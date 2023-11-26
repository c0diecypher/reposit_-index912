import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./css/item.css";
import productsData from "./productsData";
import { Link } from "react-router-dom";
import axios from 'axios';

const Products = ({userId}) => {
  const [items, setItems] = useState([]);
  const [discount, setDiscount] = useState([]);
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
    reloadDiscount();
    SendDiscount();
  },[])
  
  const reloadDiscount = async () => {
  try {
    const eventSource = new EventSource('https://crm.zipperconnect.space/connect/discount');
    eventSource.onmessage = function (event){
      const discount = JSON.parse(event.data);
      // Проверка наличия данных перед установкой
      if (discount) {
        setDiscount(discount);
      } else {
        console.warn('Discount data is empty or invalid.');
      }
    };
  } catch (error) {
    console.error('Error connecting to discount event source:', error);
  }
};

const SendDiscount = async () => {
  try {
    const response = await axios.post('https://crm.zipperconnect.space/get/discount', {
      userId: userId,
    });

    const discountData = response.data;
    // Проверка наличия данных перед использованием
    if (discountData) {
      // Handle discount data as needed
    } else {
      console.warn('Discount data is empty or invalid.');
    }
  } catch (error) {
    console.error('Error fetching discount data:', error);
  }
};

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
              <div className="item-info">
              <h4>
                {discount.includes(product.id) && (
                  <>
                    {product.price && (
                      <>
                        {`${Number(product.price.replace(/[\u00a0₽ ]/g, '').replace(',', '.')) - 500}₽`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')}
                        <del style={{ marginLeft:'4px', fontWeight:'400', fontSize: '12px', color: 'var(--tg-hint)' }}>{`${product.price}₽`}</del>{" "}
                      </>
                    )}
                  </>
                )}
                {!discount.includes(product.id) && `${product.price}₽`}
              </h4>
              <p>{product.name}</p>
              <button className="add-item">
                <div className="buy-item">Купить</div>
              </button>
              </div>
          </Link>
        </div>
      ))}
      </main>
    </InfiniteScroll>
  );
};

export default Products;
