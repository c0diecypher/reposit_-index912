  import "./css/Search.css";
  import { useState, useEffect } from "react";
  import productsData from "../Products/productsData";
  import { Link } from "react-router-dom";
  import "../Products/css/item.css"
  const filterItem = (searchText, listOfItems) => {
    if (!searchText) {
      return listOfItems;
    }
    return listOfItems.filter(({ name }) =>
      name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  function Search() {
    const [itemList, setItemList] = useState(productsData);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
      const Debounce = setTimeout(() => {
        const filteredItem = filterItem(searchTerm, productsData);
        setItemList(filteredItem);
      }, 200);
      return () => clearTimeout(Debounce);
    });

    return (
      <div className="wrapper__form__container">
        <div className="wrapper__form__container_input_">
          <div className="wrapper__form__container_background_"></div>
          <div className="wrapper__form__container_icon_">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="tabler-icon tabler-icon-search"
            >
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
              <path d="M21 21l-6 -6"></path>
            </svg>
          </div>
          <input
            type="text"
            enterKeyHint="search"
            placeholder="Найти"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <main>
        {itemList.map((product) => {
          return (
            <div className="item" key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <div className="item-img">
                    <img src={product.img[0]} alt="" />
                  </div>
                  <div className="item-info">
                    <p>{product.name}</p>
                  <button className="add-item">
                    <div className="buy-item">Смотреть подробнее</div>
                  </button>
                </div>  
                  </Link>
              </div>
          );
        })}
        </main>
      </div>
    );
  }

  export default Search;
