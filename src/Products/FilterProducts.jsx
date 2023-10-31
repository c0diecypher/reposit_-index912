import { useState } from 'react';
import productsData from './productsData';
import { Link } from 'react-router-dom';
import './css/item.css';
import './css/filter.css';
import { MainButton } from "@twa-dev/sdk/react" 

function FilterProducts() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFiltersText, setActiveFiltersText] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [color] = useState(window.Telegram.WebApp.themeParams.button_color);
  const [textColor] = useState(window.Telegram.WebApp.themeParams.button_text_color);

  const updateActiveFiltersText = () => {
    const filters = [];

    if (selectedCategories.length > 0 || sortBy !== '') {
      filters.push('Применены фильтры:');

      if (sortBy === 'cheap') {
        filters.push('Недорогие');
      } else if (sortBy === 'expensive') {
        filters.push('Дорогие');
      } else if (sortBy === 'best_seller') {
        filters.push('Популярные');
      }
    } else {
      filters.push('Применены фильтры');
    }

    if (minPrice || maxPrice) {
      const priceRange = [];
      if (minPrice) {
        priceRange.push(`от ${minPrice}₽`);
      }
      if (maxPrice) {
        priceRange.push(`до ${maxPrice}₽`);
      }
      filters.push(priceRange.join(' - '));
    }

    if (selectedCategories.length > 0) {
      filters.push(selectedCategories.join(', '));
    }

    const filtersText = filters.length > 0 ? filters.join(' ') : '';
    setActiveFiltersText(filtersText);
  };

  const handleFiltersChange = () => {
    updateActiveFiltersText();
    applyFiltersAndSort();
    setFiltersVisible(false);
  };

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((selectedCategory) => selectedCategory !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const getUniqueCategories = (products) => {
    const uniqueCategories = Array.from(new Set(products.map((product) => product.category)));
    return uniqueCategories;
  };

  const filterProductsByCategories = (products, selectedCategories) => {
    if (selectedCategories.length === 0) {
      return products;
    }
    return products.filter((product) => selectedCategories.includes(product.category));
  };

  const applyFiltersAndSort = () => {
    let updatedProducts = productsData.slice();

    updatedProducts = filterProductsByCategories(updatedProducts, selectedCategories);

    updatedProducts = updatedProducts.filter((product) => {
      const price = parseFloat(product.price.replace(/\D/g, ''));

      if (minPrice && maxPrice) {
        return price >= parseFloat(minPrice) && price <= parseFloat(maxPrice);
      } else if (minPrice) {
        return price >= parseFloat(minPrice);
      } else if (maxPrice) {
        return price <= parseFloat(maxPrice);
      }

      return true;
    });

    if (sortBy === 'cheap') {
      updatedProducts = updatedProducts.filter((product) => {
        const price = parseFloat(product.price.replace(/\D/g, ''));
        return price < 10000;
      });
    } else if (sortBy === 'best_seller') {
      updatedProducts = updatedProducts.filter((product) => product.best_seller);
    } else if (sortBy === 'expensive') {
      updatedProducts = updatedProducts.filter((product) => {
        const price = parseFloat(product.price.replace(/\D/g, ''));
        return price >= 20000;
      });
    }

    setFilteredProducts(updatedProducts);
    setFiltersApplied(true);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setMinPrice('');
    setMaxPrice('');
    setSortBy('');
    setFiltersApplied(false);
    setFilteredProducts([]);
    setFiltersVisible(true);
  };

  const uniqueCategories = getUniqueCategories(productsData);

  const handleMinPriceChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length > 7) {
      return;
    }
    setMinPrice(value);
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length > 7) {
      return;
    }
    setMaxPrice(value);
  };

  return (
    <div className="filters">
      {filtersVisible && (
        <div className="filters-body">
          <h2>Фильтр</h2>
          <div className="filter-price-text">Цена, Р</div>
          <div className="filter-price">
            <label className="filter-input-price">
              <div className="filter-price-label">От</div>
              <input
                className="filter-price-label-input"
                type="text"
                value={minPrice}
                onChange={handleMinPriceChange}
              />
            </label>
            <label className="filter-input-price">
              <div className="filter-price-label">До</div>
              <input
                className="filter-price-label-input"
                type="text"
                value={maxPrice}
                onChange={handleMaxPriceChange}
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
                          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 1.667c-.182 0-.36.001-.535.004l-.513.014-.25.01-.482.03-.46.038c-3.988.386-5.61 2.009-5.998 5.996l-.038.461-.028.483c-.004.081-.009.165-.011.249l-.014.513-.004.265V10c0 .182.001.36.004.535l.014.513.01.25.03.482.037.46c.387 3.988 2.01 5.61 5.997 5.998l.461.038.482.028c.082.004.165.009.25.011l.513.014.535.004.535-.004.513-.014.25-.01.482-.03.46-.037c3.988-.387 5.61-2.01 5.998-5.997l.038-.461.028-.482c.004-.082.009-.165.011-.25l.014-.513.004-.535-.004-.535-.014-.513-.01-.25-.03-.482-.037-.46c-.387-3.988-2.01-5.61-5.997-5.997l-.461-.039-.482-.028a23.59 23.59 0 0 0-.25-.011l-.513-.014-.265-.003-.27-.001Zm1.91 6.077a.833.833 0 0 1 1.248 1.1l-.069.079-3.333 3.333a.834.834 0 0 1-1.1.069l-.079-.07-1.666-1.666a.833.833 0 0 1 1.1-1.247l.078.069 1.078 1.077 2.744-2.744Z" fill="currentColor">
                            </path>
                          </svg>
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
                    <span className="checkbox-text">{category}</span>
                  </button>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
      {filtersApplied ? (
        <div className="active-filter-text">
          <span>{activeFiltersText}</span>
          <button className="active-filter-btn" onClick={clearFilters}>
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 5 5 15M5 5l10 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </div>
      ) : (
        <MainButton 
          onClick={handleFiltersChange}
          text={`Применить фильтр`}
          color={color}
          textColor={textColor}
          />
      )}
      {filteredProducts.length === 0 ? (
        <p></p>
      ) : (
        <main>
          {filteredProducts.map((product) => (
            <div className="item" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <div className="item-img">
                  <img src={product.img[0]} alt="" />
                </div>
                <div className="item-info">
                  <h4>{product.price}</h4>
                  <p>{product.name}</p>
                  <button className="add-item">
                    <div className="buy-item">Купить</div>
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </main>
      )}
    </div>
  );
}

export default FilterProducts;
