import Overflow from "./components/Overflow";

function App() {
  return (
    <div className="App">
      <h1>Add scroll and arrow icon if the paragraph is bigger than 300</h1>
      <Overflow>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni alias
        aliquam pariatur dignissimos, voluptatum doloribus ipsum provident sed.
        Nemo obcaecati corporis maxime beatae. Deleniti cumque ipsa, eaque
        dolores officiis atque. <br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni alias
        aliquam pariatur dignissimos, voluptatum doloribus ipsum provident sed.
        Nemo obcaecati corporis maxime beatae. Deleniti cumque ipsa, eaque
        dolores officiis atque. <br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni alias
        aliquam pariatur dignissimos, voluptatum doloribus ipsum provident sed.
        Nemo obcaecati corporis maxime beatae. Deleniti cumque ipsa, eaque
        dolores officiis atque. <br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni alias
        aliquam pariatur dignissimos, voluptatum doloribus ipsum provident sed.
        Nemo obcaecati corporis maxime beatae. Deleniti cumque ipsa, eaque
        dolores officiis atque. <br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni alias
        aliquam pariatur dignissimos, voluptatum doloribus ipsum provident sed.
        Nemo obcaecati corporis maxime beatae. Deleniti cumque ipsa, eaque
        dolores officiis atque.
      </Overflow>

      <Overflow>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni alias
        aliquam pariatur dignissimos, voluptatum doloribus ipsum provident sed.
        Nemo obcaecati corporis maxime beatae. Deleniti cumque ipsa, eaque
        dolores officiis atque. <br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni alias
        aliquam pariatur dignissimos, voluptatum doloribus ipsum provident sed.
        Nemo obcaecati corporis maxime beatae. Deleniti cumque ipsa, eaque
        dolores officiis atque. <br />
      </Overflow>
    </div>
  );
}

export default App;
