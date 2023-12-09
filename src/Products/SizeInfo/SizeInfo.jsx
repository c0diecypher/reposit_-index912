
import "../css/SelectSize.css";
import { Link } from "react-router-dom";

function SizeInfo() {
  return (
    <div className="size">
      <p>Размер (EU) </p>
      <Link to={`/products/size/`}>
        <a>Размерная сетка</a>
      </Link>
    </div>
  );
}

export default SizeInfo;
