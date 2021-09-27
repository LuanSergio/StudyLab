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
  const [navigationIndex, setNavigationIndex] = useState(0);

  function updateIndex(newIndex: number): void {
    setNavigationIndex((previousState) => previousState + newIndex);
  }

  function goToPreviousIndex(newIndex: number): void {
    if (navigationIndex + 689 >= 689) {
      newIndex = 0;
    }
    updateIndex(newIndex);
  }

  function goToNextIndex(newIndex: number): void {
    if (-(Children.count(children) * 689) >= navigationIndex - 689) {
      newIndex = 0;
    }
    updateIndex(newIndex);
  }

  return (
    <div className="carousel">
      <Tag
        className="carousel__items-holder"
        style={{ transform: `translateX(${navigationIndex}px)` }}
      >
        {children}
      </Tag>
      <div className="carousel__controls">
        <button onClick={() => goToPreviousIndex(689)}>{"< Previous"}</button>
        <button onClick={() => goToNextIndex(-689)}>{"Next >"}</button>
      </div>
    </div>
  );
};

export default Carousel;
