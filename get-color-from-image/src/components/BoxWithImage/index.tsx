import totodile from "../../assets/images/totodile.png";
import "./styles.css";
const color = "#80CAD3";

const BoxWithImage = () => {
  return (
    <div className="image-container" style={{ backgroundColor: color }}>
      <img className="image" src={totodile} alt="" />
    </div>
  );
};

export default BoxWithImage;
