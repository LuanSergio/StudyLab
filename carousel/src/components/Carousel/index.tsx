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
  const itemWidth = 468.667;
  const [navigationIndex, setNavigationIndex] = useState(0);

  const [itemIndex, setItemIndex] = useState(0);
  const [position, setPosition] = useState(0);
  const [initialPosition, setInicialPosition] = useState(0);
  const [isMouseLocked, setIsMouseLocked] = useState(false);

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

  function moveCarousel(event: React.MouseEvent): void {
    if (isMouseLocked) {
      const moved = initialPosition - event.clientX;
      setPosition(moved);
      console.log("moved", moved);
    }
  }

  function handleMouseDown(event: React.MouseEvent): void {
    event.preventDefault();
    setIsMouseLocked(true);
    setInicialPosition(event.clientX);
    console.log(event.clientX);
  }

  function handleMouseMove(event: React.MouseEvent): void {
    if (isMouseLocked) {
      const travelDistance = event.clientX - initialPosition;
      event.preventDefault();
      // if (travelDistance > itemWidth) {
      //   setItemIndex((previoustState) => previoustState + 1);
      // } else if (travelDistance < -itemWidth) {
      //   setItemIndex((previoustState) => previoustState - 1);
      // }
      setPosition(travelDistance);
    }
  }

  function handleMouseUp(event: React.MouseEvent): void {
    event.preventDefault();
    setIsMouseLocked(false);
  }

  return (
    <div
      className="carousel"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Tag
        className="carousel__items-holder"
        style={{ transform: `translateX(${position}px)` }}
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
