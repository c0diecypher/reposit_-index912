import "./css/item.css";
import productsData from "./productsData";
import { Link } from "react-router-dom";

const Products = () => {
  const products = productsData.map((product) => {
    return (
      <>
      <div className="item">
        <div key={product.id}>
          <img src={"/img/img/" + product.img} alt="" />
          <h4>{product.price}₽</h4>
          <p>{product.name}</p>
          <button className="add-item">
            <Link to={`/products/${product.id}`}>
              <div className="buy-item">Купить</div>
            </Link>
          </button>
        </div>
      </div>
      </>
    );
  });

  return (
    <>
      <main>{products}</main>
    </>
  );
};

export default Products;
