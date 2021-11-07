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
  const maxPosition = (itemLength - 1) * totalItemWidth;
  const minPosition = 0;

  async function updateCarouselPosition(newPosition: number): Promise<void> {
    await carouselRef.current?.style.setProperty(
      "--carousel-position",
      `${newPosition}px`
    );
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

    //jump effect
    // index = Math.floor(Math.abs(position) / totalItemWidth);
    // position = index * totalItemWidth;
    // updateCarouselIndex(-position);
  }

  function goToPreviousIndex(newIndex: number): void {
    console.log("index", index);

    if (index > 0) {
      console.log("previous item");

      index--;
      position = index * totalItemWidth;
      updateCarouselIndex(-position);
    }
  }

  function goToNextIndex(newIndex: number): void {
    console.log("index", index);
    if (index < itemLength - 1) {
      console.log("next item");
      index++;
      position = index * totalItemWidth;
      updateCarouselIndex(-position);
    }
  }

  function handleMouseLeave(event: React.MouseEvent): void {
    isMouseLocked = false;
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
        <div
          className="carousel"
          ref={carouselRef}
          // onMouseLeave={handleMouseLeave}
        >
          <Tag className="carousel__items-holder">{children}</Tag>
        </div>
      </div>
      <div className="carousel__controls">
        <button onClick={() => goToPreviousIndex(itemWidth)}>
          {"< Previous"}
        </button>

        <button onClick={() => goToNextIndex(-itemWidth)}>{"Next >"}</button>
      </div>
    </>
  );
};

export default Carousel;
