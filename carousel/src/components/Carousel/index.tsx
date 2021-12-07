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
const animationDuration = 300;

const Carousel = ({
  children,
  tagName = "div",
}: CarouselProps): JSX.Element => {
  const Tag = tagName as keyof JSX.IntrinsicElements;
  const carouselRef = useRef<HTMLDivElement>(null);
  let itemLength = Children.count(children);
  const maxIndex = itemLength - 1;
  const maxPosition = (itemLength - 1) * totalItemWidth;
  const minPosition = 0;

  async function updateCarouselPosition(newPosition: number): Promise<void> {
    await carouselRef.current?.style.setProperty(
      "--carousel-position",
      `${newPosition}px`
    );
    index = Math.abs(Math.round(newPosition / totalItemWidth));
  }

  function setCarouselAnimationDuration() {
    carouselRef.current?.style.setProperty(
      "transition-duration",
      `${animationDuration}ms`
    );
  }

  function removeCarouselAnimationDuration() {
    setTimeout(() => {
      carouselRef.current?.style.setProperty("transition-duration", `0ms`);
    }, animationDuration);
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

      const newPosition = travelDistance + lastPosition;

      if (
        newPosition >= -Math.abs(maxPosition) &&
        newPosition <= -Math.abs(minPosition)
      ) {
        position = newPosition;
        updateCarouselPosition(position);
      }
    }
  }

  function handleMouseUp(event: React.MouseEvent): void {
    event.preventDefault();
    lastPosition = position;
    isMouseLocked = false;
  }

  function handleMouseLeave(event: React.MouseEvent): void {
    isMouseLocked = false;
  }

  function goToPreviousIndex() {
    if (index > minPosition) {
      index = index - 1;
      updateCarouselIndex(-(index * totalItemWidth));
      lastPosition = -(index * totalItemWidth);
    }
  }

  function goToNextIndex() {
    if (index < maxIndex) {
      index = index + 1;
      updateCarouselIndex(-(index * totalItemWidth));
      lastPosition = -(index * totalItemWidth);
    }
  }

  return (
    <>
      <div
        className="container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div className="carousel" ref={carouselRef}>
          <Tag className="carousel__items-holder">{children}</Tag>
        </div>
      </div>
      <div className="carousel__controls">
        <button onClick={goToPreviousIndex}>{"< Previous"}</button>
        <button onClick={goToNextIndex}>{"Next >"}</button>
      </div>
    </>
  );
};

export default Carousel;
