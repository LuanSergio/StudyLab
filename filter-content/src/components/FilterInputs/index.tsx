import "./styles.css";
import React from "react";
import { useFilter } from "../../context";

const FilterInputs = () => {
  const { data, handleChange, clearFilterProperty, handleClearButtonClick } =
    useFilter();
  const colors = Array.from(new Set(data.map((item) => item.color)));
  const fruits = Array.from(new Set(data.map((item) => item.name)));

  function handleInputClick(
    key: keyof IData,
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ): void {
    clearFilterProperty(key);
    (event.target as HTMLInputElement).value = "";
  }

  return (
    <div className="container">
      <input
        onClick={(event) => handleInputClick("name", event)}
        onChange={(event) => handleChange("name", event)}
        className="input"
        title="Filter by fruits"
        list="fruits"
        name="fruit"
        type="text"
        spellCheck="false"
        placeholder="Fruits"
      />

      <datalist id="fruits">
        {fruits.map((fruit: string, index: number) => (
          <option value={fruit} key={index} />
        ))}
      </datalist>

      <button
        onClick={() => handleClearButtonClick("name")}
        className="clear-button"
      >
        x
      </button>

      <input
        className="input"
        onClick={(event) => handleInputClick("color", event)}
        onChange={(event) => handleChange("color", event)}
        title="Filter by color"
        list="color"
        name="color"
        type="text"
        spellCheck="false"
        placeholder="Color"
      />

      <button
        onClick={() => handleClearButtonClick("color")}
        className="clear-button"
      >
        x
      </button>

      <datalist id="color">
        {colors.map((color: string, index: number) => (
          <option value={color} key={index} />
        ))}
      </datalist>

      <input
        onClick={(event) => handleInputClick("date", event)}
        onChange={(event) => handleChange("date", event)}
        className="input date"
        type="date"
        name="date"
      />

      <button
        onClick={() => handleClearButtonClick("date")}
        className="clear-button"
      >
        x
      </button>
    </div>
  );
};

export default FilterInputs;
