import "./styles.css";
import React from "react";
import { useFilter } from "../../context";

interface IData {
  name: string;
  color: string;
  createdAt: string;
}

const FilterInputs = () => {
  const { data, handleFruitChange, handleColorChange } = useFilter();
  const colors = Array.from(new Set(data.map((item) => item.color)));

  function handleInputClick(
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ): void {
    (event.target as HTMLInputElement).value = "";
  }

  return (
    <div className="container">
      <input
        onClick={(event) => handleInputClick(event)}
        onChange={handleFruitChange}
        className="input"
        title="Filter by fruits"
        list="fruits"
        name="fruits"
        type="text"
        spellCheck="false"
        placeholder="Fruits"
      />

      <datalist id="fruits">
        {data.map((item: IData, index: number) => (
          <option value={item.name} key={index} />
        ))}
      </datalist>

      <input
        className="input"
        onClick={(event) => handleInputClick(event)}
        onChange={handleColorChange}
        title="Filter by color"
        list="color"
        name="color"
        type="text"
        spellCheck="false"
        placeholder="Color"
      />

      <datalist id="color">
        {colors.map((color: string, index: number) => (
          <option value={color} key={index} />
        ))}
      </datalist>

      <input className="input date" type="date" name="date" />
    </div>
  );
};

export default FilterInputs;
