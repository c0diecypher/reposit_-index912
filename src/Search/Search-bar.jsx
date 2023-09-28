
import { Link } from "react-router-dom";
import "./css/Searchbar.css";

function Searchbar() {
  return (
    <Link to={`/search`}>
      <div className="wrapper__form__container__">
        <div className="wrapper__form__container_background"></div>
        <div className="wrapper__form__container_input">
          <div className="wrapper__form__container_icon">
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
            value=""
          />
        </div>
      </div>
    </Link>
  );
}

export default Searchbar;
