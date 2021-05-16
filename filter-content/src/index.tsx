import React from "react";
import ReactDOM from "react-dom";
import { FilterContextProvider } from "./context";
import FilterInputs from "./components/FilterInputs";
import "./index.css";
import Table from "./components/Table";

ReactDOM.render(
  <React.StrictMode>
    <FilterContextProvider>
      <FilterInputs></FilterInputs>
      <Table />
    </FilterContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
