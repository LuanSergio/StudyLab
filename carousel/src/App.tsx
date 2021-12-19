import Carousel from "./components/Carousel";
import Item from "./components/Item";

function App() {
  return (
    <Carousel tagName="ul">
      <Item label="slide 1">Slide 1</Item>
      <Item label="slide 2">Slide 2</Item>
      <Item label="slide 3">Slide 3</Item>
      <Item label="slide 4">Slide 4</Item>
      <Item label="slide 5">Slide 5</Item>
      <Item label="slide 6">Slide 6</Item>
      <Item label="slide 7">Slide 7</Item>
      <Item label="slide 8">Slide 8</Item>
      <Item label="slide 9">Slide 9</Item>
    </Carousel>
  );
}

export default App;
