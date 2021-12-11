import { Children, ReactNode, useEffect, useRef } from "react";
import "./styles.css";
import useCarousel from "./hook";

interface CarouselProps {
  children: ReactNode;
  tagName?: keyof JSX.IntrinsicElements;
}

const itemWidth = 500;
const gap = 30;
const totalItemWidth = itemWidth + gap;

const Carousel = ({
  children,
  tagName = "div",
}: CarouselProps): JSX.Element => {
  let itemsQuantity = Children.count(children);
  const Tag = tagName as keyof JSX.IntrinsicElements;
  const carouselRef = useRef<HTMLDivElement>(null);

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    goToPreviousIndex,
    goToNextIndex,
  } = useCarousel({ carouselRef, totalItemWidth, itemsQuantity });

  useEffect(() => {
    carouselRef.current?.style.setProperty("--carousel-gap", `${gap}px`);
  }, []);

  return (
    <div
      className="carousel"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div className="carousel__wrapper" ref={carouselRef}>
        <Tag className="carousel__items-holder">{children}</Tag>
      </div>
      <div className="carousel__controls">
        <button onClick={goToPreviousIndex}>{"< Previous"}</button>
        <button onClick={goToNextIndex}>{"Next >"}</button>
      </div>
    </div>
  );
};

export default Carousel;
