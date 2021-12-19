import { Children, ReactNode, useEffect, useRef } from "react";
import "./styles.css";
import useCarousel from "./hook";

interface CarouselProps {
  children: ReactNode;
  tagName?: keyof JSX.IntrinsicElements;
  carouselDescription?: string;
}

const itemWidth = 500;
const gap = 30;
const totalItemWidth = itemWidth + gap;

const Carousel = ({
  children,
  tagName = "div",
  carouselDescription,
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
      aria-roledescription="carousel"
      aria-label={carouselDescription}
    >
      <div className="carousel__wrapper" ref={carouselRef}>
        <Tag
          className="carousel__items-holder"
          aria-atomic="false"
          aria-live="polite"
        >
          {children}
        </Tag>
      </div>
      <div className="carousel__controls">
        <button aria-label="Previous slide" onClick={goToPreviousIndex}>
          {"< Previous"}
        </button>
        <button aria-label="Next slide" onClick={goToNextIndex}>
          {"Next >"}
        </button>
      </div>
      <ol className="carousel__bullet-container">
        <li>
          <button className="carousel__bullet carousel__bullet--active" />
        </li>
        <li>
          <button className="carousel__bullet" />
        </li>
        <li>
          <button className="carousel__bullet" />
        </li>
        <li>
          <button className="carousel__bullet" />
        </li>
        <li>
          <button className="carousel__bullet" />
        </li>
      </ol>
    </div>
  );
};

export default Carousel;
