import { useState } from 'react';
import productsData from './productsData';
import { Link } from 'react-router-dom';
import './css/item.css';
import './css/filter.css';
import { MainButton } from "@twa-dev/sdk/react" 

function FilterProducts() {
  const [selectedCategories, setSelectedCategories] = useState([]); // Состояние для выбранных категорий
  const [minPrice, setMinPrice] = useState(''); // Минимальная цена
  const [maxPrice, setMaxPrice] = useState(''); // Максимальная цена
  const [sortBy, setSortBy] = useState(''); // Состояние для выбора сортировки
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]); // Состояние для отфильтрованных товаров
  const [color] = useState(window.Telegram.WebApp.themeParams.button_color);
  const [textColor] = useState(
    window.Telegram.WebApp.themeParams.button_text_color
  );
  const [text] = useState("Перейти к оплате");
  
  // Функция, которая обрабатывает изменение выбранных категорий
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((selectedCategory) => selectedCategory !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Функция, которая возвращает уникальные категории из данных
  const getUniqueCategories = (products) => {
    const uniqueCategories = Array.from(new Set(products.map((product) => product.category)));
    return uniqueCategories;
  };

  // Функция, которая фильтрует товары на основе выбранных категорий
  const filterProductsByCategories = (products, selectedCategories) => {
    if (selectedCategories.length === 0) {
      return products;
    }
    return products.filter((product) => selectedCategories.includes(product.category));
  };

  // Функция, которая применяет фильтры и сортировку
  const applyFiltersAndSort = () => {
    let updatedProducts = productsData.slice(); // Копия исходных данных

    updatedProducts = filterProductsByCategories(updatedProducts, selectedCategories);

    if (minPrice !== '' && maxPrice !== '') {
      updatedProducts = updatedProducts.filter((product) => {
        const price = parseFloat(product.price.replace(/\D/g, ''));
        return price >= parseFloat(minPrice) && price <= parseFloat(maxPrice);
      });
    }

    if (sortBy === 'cheap') {
      updatedProducts = updatedProducts.filter((product) => {
        const price = parseFloat(product.price.replace(/\D/g, ''));
        return price < 10000;
      });
    }

    if (sortBy === 'best_seller') {
      updatedProducts = updatedProducts.filter((product) => product.best_seller);
    }

    if (sortBy === 'expensive') {
      updatedProducts = updatedProducts.filter((product) => {
        const price = parseFloat(product.price.replace(/\D/g, ''));
        return price >= 20000;
      });
    }

    setFilteredProducts(updatedProducts);
    setFiltersApplied(true);
  };

  // Функция для сброса фильтров
  const clearFilters = () => {
    setSelectedCategories([]);
    setMinPrice('');
    setMaxPrice('');
    setSortBy('');
    setFiltersApplied(false);
    setFilteredProducts([]); // Очищаем отфильтрованные товары
  };

  const uniqueCategories = getUniqueCategories(productsData);

  return (
    <div className="filters">
      <h2>Фильтр</h2>
      <div className="filters-body">
        <div className="filter-price-text">Цена, Р</div>
        <div className="filter-price">
          <label className="filter-input-price">
            <div className="filter-price-label">От</div>
            <input
              className="filter-price-label-input"
              type="text"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </label>
          <label className="filter-input-price">
            <div className="filter-price-label">До</div>
            <input
              className="filter-price-label-input"
              type="text"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </label>
        </div>
        <div className="sort-price">
          <button
            className={`label-price ${sortBy === 'cheap' ? 'selected' : ''}`}
            onClick={() => setSortBy('cheap')}
          >
            Меньше
          </button>
          <button
            className={`label-price ${sortBy === 'best_seller' ? 'selected' : ''}`}
            onClick={() => setSortBy('best_seller')}
          >
            Популярные
          </button>
          <button
            className={`label-price ${sortBy === 'expensive' ? 'selected' : ''}`}
            onClick={() => setSortBy('expensive')}
          >
            Больше
          </button>
        </div>
        <div className="filters-item">
          <h3>Категории</h3>
          <div className="tag-filters-item">
            {uniqueCategories.map((category) => (
              <label className="tag-filter-button" key={category}>
                <button
                  className={`checkbox-item ${
                    selectedCategories.includes(category) ? 'selected' : ''
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  <span className="checkbox-check">
                    <input
                      type="checkbox"
                      className="checkbox-check-input"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <span className="checkbox-icon">
                      {selectedCategories.includes(category) ? (
                        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 1.667c-.182 0-.36.001-.535.004l-.513.014-.25.01-.482.03-.46.038c-3.988.386-5.61 2.009-5.998 5.996l-.038.461-.028.483c-.004.081-.009.165-.011.249l-.014.513-.004.265V10c0 .182.001.36.004.535l.014.513.01.25.03.482.037.46c.387 3.988 2.01 5.61 5.997 5.998l.461.038.482.028c.082.004.165.009.25.011l.513.014.535.004.535-.004.513-.014.25-.01.482-.03.46-.037c3.988-.387 5.61-2.01 5.998-5.997l.038-.461.028-.482c.004-.082.009-.165.011-.25l.014-.513.004-.535-.004-.535-.014-.513-.01-.25-.03-.482-.037-.46c-.387-3.988-2.01-5.61-5.997-5.997l-.461-.039-.482-.028a23.59 23.59 0 0 0-.25-.011l-.513-.014-.265-.003-.27-.001Zm1.91 6.077a.833.833 0 0 1 1.248 1.1l-.069.079-3.333 3.333a.834.834 0 0 1-1.1.069l-.079-.07-1.666-1.666a.833.833 0 0 1 1.1-1.247l.078.069 1.078 1.077 2.744-2.744Z" fill="currentColor"></path></svg>
                      ) : (
                        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 2.5c6 0 7.5 1.5 7.5 7.5S16 17.5 10 17.5 2.5 16 2.5 10 4 2.5 10 2.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                ></path>
              </svg>
                      )}
                    </span>
                  </span>
                </button>
                <span className="checkbox-text">{category}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      {filtersApplied ? (
            <MainButton 
          onClick={clearFilters}
          text=`Cбросить фильры`
          color={color}
          textColor={textColor}
          />
      ) : (
        <MainButton 
          onClick={applyFiltersAndSort}
          text=`Применить Фильтр`
          color={color}
          textColor={textColor}
          />
      )}
      <h3>Результаты фильтрации и сортировки:</h3>
      {filteredProducts.length === 0 ? (
        <p>Нет товаров, соответствующих выбранным критериям.</p>
      ) : (
        <main>
          {filteredProducts.map((product) => (
            <div className="item" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img src={product.img[0]} alt="" />
                <h4>{product.price}₽</h4>
                <p>{product.name}</p>
                <button className="add-item">
                  <div className="buy-item">Купить</div>
                </button>
              </Link>
            </div>
          ))}
        </main>
      )}
    </div>
  );
}

export default FilterProducts;
