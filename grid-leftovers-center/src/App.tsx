import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <ul className="container">
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
      </ul>

      <ul className="container">
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
      </ul>

      <ul className="container">
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
        <li className="item"></li>
      </ul>
    </div>
  );
}

export default App;
