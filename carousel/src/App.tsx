import Carousel from "./components/Carousel";
import Item from "./components/Item";

function App() {
  return (
    <Carousel tagName="ul">
      <Item>Slide 1</Item>
      <Item>Slide 2</Item>
      <Item>Slide 3</Item>
      <Item>Slide 4</Item>
      <Item>Slide 5</Item>
    </Carousel>
  );
}

export default App;
