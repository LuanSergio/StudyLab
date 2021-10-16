import { Children, ReactNode, useState } from "react";
import "./styles.css";

interface CarouselProps {
  children: ReactNode;
  tagName?: keyof JSX.IntrinsicElements;
}

const Carousel = ({
  children,
  tagName = "div",
}: CarouselProps): JSX.Element => {
  const Tag = tagName as keyof JSX.IntrinsicElements;
  const itemWidth = 689;
  const [navigationIndex, setNavigationIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState(0);

  function updateIndex(newIndex: number): void {
    setNavigationIndex((previousState) => previousState + newIndex);
  }

  function goToPreviousIndex(newIndex: number): void {
    if (navigationIndex + itemWidth >= itemWidth) {
      newIndex = 0;
    }
    updateIndex(newIndex);
  }

  function goToNextIndex(newIndex: number): void {
    if (
      -(Children.count(children) * itemWidth) >=
      navigationIndex - itemWidth
    ) {
      newIndex = 0;
    }
    updateIndex(newIndex);
  }

  function move(event: React.MouseEvent) {
    event.preventDefault();
    console.log("initial position", event.clientX);
    updateIndex(-event.clientX);
    setMousePosition(event.clientX);
  }

  function lock(event: React.MouseEvent) {
    event.preventDefault();
    console.log("end position", event.clientX);
    const calculatedPosition = event.clientX - mousePosition;
    console.log("calculated position", calculatedPosition);
    if (calculatedPosition >= itemWidth / 3) {
      goToPreviousIndex(itemWidth);
    } else if (calculatedPosition <= -(itemWidth / 3)) {
      goToNextIndex(-itemWidth);
    }
  }

  return (
    <div className="carousel" onMouseDown={move} onMouseUp={lock}>
      <Tag
        className="carousel__items-holder"
        style={{ transform: `translateX(${navigationIndex}px)` }}
      >
        {children}
      </Tag>
      <div className="carousel__controls">
        <button onClick={() => goToPreviousIndex(itemWidth)}>
          {"< Previous"}
        </button>
        <button onClick={() => goToNextIndex(-itemWidth)}>{"Next >"}</button>
      </div>
    </div>
  );
};

export default Carousel;
