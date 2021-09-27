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
    if (navigationIndex > 0) {
      newIndex = 0;
    }
    // if (-(Children.count(children) * 665) >= navigationIndex) {
    //   newIndex = 0;
    // }
    setNavigationIndex((previousState) => previousState + newIndex);
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
        <button onClick={() => updateIndex(665)}>{"< Previous"}</button>
        <button onClick={() => updateIndex(-665)}>{"Next >"}</button>
      </div>
    </div>
  );
};

export default Carousel;
