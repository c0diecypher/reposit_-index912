import { useState } from 'react';
import productsData from './productsData'; // Подключаем вашу базу данных
import { Link } from "react-router-dom";
import "./css/item.css";
import "./css/filter.css"
function FilterProducts() {
  const [selectedBrands, setSelectedBrands] = useState([]); // Состояние для выбранных брендов
  const [minPrice, setMinPrice] = useState(''); // Минимальная цена
  const [maxPrice, setMaxPrice] = useState(''); // Максимальная цена
  const [sortBy, setSortBy] = useState(''); // Состояние для выбора сортировки

  // Функция, которая обрабатывает изменение выбранных брендов
  const handleBrandChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((selectedBrand) => selectedBrand !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  // Функция, которая применяет фильтры и сортировку
  const applyFiltersAndSort = () => {
    let filteredProducts = productsData;

    // Фильтр по брендам
    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedBrands.includes(product.category)
      );
    }

    // Фильтр по цене "от и до"
    if (minPrice !== '' && maxPrice !== '') {
      filteredProducts = filteredProducts.filter((product) => {
        const price = parseFloat(product.price.replace(/\D/g, ''));
        return price >= parseFloat(minPrice) && price <= parseFloat(maxPrice);
      });
    }

    // Сортировка по цене и популярности
    // Фильтр "дешевые" (цена менее 30,000)
    if (sortBy === 'cheap') {
        filteredProducts = filteredProducts.filter((product) => {
        const price = parseFloat(product.price.replace(/\D/g, ''));
        return price < 30000;
        });
  }
    
    if (sortBy === 'best_seller') {
        filteredProducts = filteredProducts.filter((product) => product.best_seller);
    }

    
      if (sortBy === 'expensive') {
        filteredProducts = filteredProducts.filter((product) => {
          const price = parseFloat(product.price.replace(/\D/g, ''));
          return price >= 30000;
        });
      }

    setFilteredProducts(filteredProducts);
  };

  const [filteredProducts, setFilteredProducts] = useState([]);

  return (
    <div className='filters'>
      <h2>Фильтр</h2>
        <div className='filters-body'>
        <div className='filter-price-text'>Цена, \u20bd</div>
      <div className='filter-price'>
        <label className='filter-input-price'>
            <div className='filter-price-label'>От</div>
            
            <input
                className='filter-price-label-input'
                type="text"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
            />

        </label>
        
        
        <label className='filter-input-price'>
            <div className='filter-price-label'>До</div>
          <input
            className='filter-price-label-input'
            type="text"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </label>
        </div>
        <div className='sort-price'>
          
            <button
            className={`label-price ${sortBy === 'cheap' ? 'selected' : ''}`}
            onClick={() => setSortBy('cheap')}
            >
            Дешевые
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
            Дорогие
            </button>
        </div>
      
      <div className='filters-item'>
        <h3>Бренд</h3>
        <div className='tag-filters-item'>
  {productsData.map((product) => (
    <label className='tag-filter-button' key={product.id}>
      <button
        className={`checkbox-item ${selectedBrands.includes(product.category) ? 'selected' : ''}`}
        onClick={() => handleBrandChange(product.category)}
      >
        <span className='checkbox-check'>
          <input
            type="checkbox"
            className='checkbox-check-input'
            checked={selectedBrands.includes(product.category)}
            onChange={() => handleBrandChange(product.category)}
          />
          <span className='checkbox-icon'>
            {selectedBrands.includes(product.category) ? (
              // SVG-иконка, которая будет отображаться, если checkbox выбран
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 1.667c-.182 0-.36.001-.535.004l-.513.014-.25.01-.482.03-.46.038c-3.988.386-5.61 2.009-5.998 5.996l-.038.461-.028.483c-.004.081-.009.165-.011.249l-.014.513-.004.265V10c0 .182.001.36.004.535l.014.513.01.25.03.482.037.46c.387 3.988 2.01 5.61 5.997 5.998l.461.038.482.028c.082.004.165.009.25.011l.513.014.535.004.535-.004.513-.014.25-.01.482-.03.46-.037c3.988-.387 5.61-2.01 5.998-5.997l.038-.461.028-.482c.004-.082.009-.165.011-.25l.014-.513.004-.535-.004-.535-.014-.513-.01-.25-.03-.482-.037-.46c-.387-3.988-2.01-5.61-5.997-5.997l-.461-.039-.482-.028a23.59 23.59 0 0 0-.25-.011l-.513-.014-.265-.003-.27-.001Zm1.91 6.077a.833.833 0 0 1 1.248 1.1l-.069.079-3.333 3.333a.834.834 0 0 1-1.1.069l-.079-.07-1.666-1.666a.833.833 0 0 1 1.1-1.247l.078.069 1.078 1.077 2.744-2.744Z" fill="currentColor"></path></svg>
            ) : (
              // SVG-иконка, которая будет отображаться, если checkbox не выбран
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 2.5c6 0 7.5 1.5 7.5 7.5S16 17.5 10 17.5 2.5 16 2.5 10 4 2.5 10 2.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            )}
          </span>
        </span>
      </button>
      <span className='checkbox-text'>{product.category}</span>
    </label>
  ))}
</div>

      </div>
      </div>
      <button onClick={applyFiltersAndSort}>Применить фильтр</button>
      <h3>Результаты фильтрации и сортировки:</h3>
      {filteredProducts.length === 0 ? (
        <p>Нет товаров, соответствующих выбранным критериям.</p>
      ) : (
        <main>
          {filteredProducts.map((product) => (
            <div className="item" key={product.id}> {/* Перенесли ключ сюда */}
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
