import "./styles.css";
import ColorThief from "colorthief";
import { SyntheticEvent, useState } from "react";

interface BoxWithImageProps {
  image: string;
}

const BoxWithImage = ({ image }: BoxWithImageProps): JSX.Element => {
  const [color, setColor] = useState<string>("");

  function getImageColor(event: SyntheticEvent<HTMLImageElement>) {
    const colorThief = new ColorThief();
    const result = colorThief.getColor(event.currentTarget);
    const colorRgb = `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
    setColor(colorRgb);
  }

  return (
    <div className="image-container" style={{ backgroundColor: color }}>
      <img
        className="image"
        src={image}
        onLoad={(event) => getImageColor(event)}
        alt=""
      />
    </div>
  );
};

export default BoxWithImage;
