import "./css/Catalog.css";

import { Link } from "react-router-dom";

function Catalog() {
  return (
    <>
      <div className="catalog-head">
        <h2 className="catalog">Каталог</h2>
        <div className="catalog-icons">
          <Link to={`/search`}>
            <button className="button-search-ico">
              <svg
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m21.875 21.875-6.25-6.25m2.083-5.208a7.292 7.292 0 1 1-14.583 0 7.292 7.292 0 0 1 14.583 0Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </Link>
          <Link to={`/filtered`}>
            <button className="button-search-ico">
            <svg
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.25 12.5a2.083 2.083 0 0 0 0-4.167m0 4.167a2.083 2.083 0 0 1 0-4.167m0 4.167v8.333m0-12.5V4.167M12.5 18.75a2.083 2.083 0 0 0 0-4.167m0 4.167a2.083 2.083 0 0 1 0-4.167m0 4.167v2.083m0-6.25V4.167m6.25 5.208a2.083 2.083 0 1 0 0-4.167m0 4.167a2.083 2.083 0 1 1 0-4.167m0 4.167v11.458m0-15.625V4.167"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Catalog;
