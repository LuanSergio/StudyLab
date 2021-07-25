import totodile from "../../assets/images/totodile.png";
import pichu from "../../assets/images/pichu.png";
import glaceon from "../../assets/images/glaceon.png";
import arcanine from "../../assets/images/arcanine.png";
import articuno from "../../assets/images/articuno.png";
import blastoise from "../../assets/images/blastoise.png";
import charizard from "../../assets/images/charizard.png";
import nidoking from "../../assets/images/nidoking.png";
import primeape from "../../assets/images/primeape.png";
import psyduck from "../../assets/images/psyduck.png";
import rapidash from "../../assets/images/rapidash.png";
import snorlax from "../../assets/images/snorlax.png";
import venusaur from "../../assets/images/venusaur.png";
import victreebel from "../../assets/images/victreebel.png";

import "./styles.css";
import ColorThief from "colorthief";
import { useState } from "react";

const images = [
  totodile,
  arcanine,
  blastoise,
  charizard,
  nidoking,
  primeape,
  articuno,
  psyduck,
  rapidash,
  snorlax,
  venusaur,
  victreebel,
  pichu,
  glaceon,
];

const BoxWithImage = () => {
  const [color, setColor] = useState<string[]>([]);

  function getImageColor(event: any) {
    const colorThief = new ColorThief();
    const result = colorThief.getColor(event.target);
    const colorRgb = `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
    setColor((prevState) => [...prevState, colorRgb]);
  }

  return (
    <div className="container">
      {images.map((image, index) => {
        return (
          <div
            key={image}
            className="image-container"
            style={{ backgroundColor: color[index] }}
          >
            <img
              className="image"
              src={image}
              onLoad={(event) => getImageColor(event)}
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
};

export default BoxWithImage;
