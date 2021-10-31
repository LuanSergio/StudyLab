import { Children, ReactNode, useRef } from "react";
import "./styles.css";

interface CarouselProps {
  children: ReactNode;
  tagName?: keyof JSX.IntrinsicElements;
}

let isMouseLocked = false;
let initialPosition = 0;
let lastPosition = 0;
let position = 0;
let index = 0;

const itemWidth = 500;
const gap = 30;
const totalItemWidth = itemWidth + gap;

const Carousel = ({
  children,
  tagName = "div",
}: CarouselProps): JSX.Element => {
  const Tag = tagName as keyof JSX.IntrinsicElements;
  const carouselRef = useRef<HTMLDivElement>(null);
  let itemLength = Children.count(children);

  async function updateCarouselPosition(newPosition: number): Promise<void> {
    await document.documentElement.style.setProperty(
      "--carousel-position",
      `${newPosition}px`
    );
  }

  function setCarouselAnimationDuration() {
    carouselRef.current?.style.setProperty("transition-duration", `300ms`);
  }

  function removeCarouselAnimationDuration() {
    setTimeout(() => {
      carouselRef.current?.style.setProperty("transition-duration", `0ms`);
    }, 300);
  }

  async function updateCarouselIndex(newPosition: number): Promise<void> {
    setCarouselAnimationDuration();
    await updateCarouselPosition(newPosition);

    removeCarouselAnimationDuration();
  }

  function handleMouseDown(event: React.MouseEvent): void {
    event.preventDefault();
    isMouseLocked = true;
    initialPosition = event.clientX;
  }

  function handleMouseMove(event: React.MouseEvent): void {
    if (isMouseLocked) {
      const travelDistance = event.clientX - initialPosition;
      position = travelDistance + lastPosition;
      updateCarouselPosition(position);
    }
  }

  function handleMouseUp(event: React.MouseEvent): void {
    event.preventDefault();
    lastPosition = position;
    isMouseLocked = false;

    // index = Math.floor(Math.abs(position) / totalItemWidth);
    // position = index * totalItemWidth;
    // updateCarouselIndex(-position);
  }

  function goToPreviousIndex(newIndex: number): void {}

  function goToNextIndex(newIndex: number): void {}

  function handleMouseLeave(event: React.MouseEvent): void {
    isMouseLocked = false;
  }

  return (
    <div
      className="container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="carousel"
        ref={carouselRef}
        // onMouseLeave={handleMouseLeave}
      >
        <Tag className="carousel__items-holder">{children}</Tag>
      </div>
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
