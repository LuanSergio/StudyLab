import { Children, ReactNode, useEffect, useState } from "react";
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
  let itemLength = Children.count(children);

  function updateCarouselPosition(newPosition: number): void {
    document.documentElement.style.setProperty(
      "--carousel-position",
      `${newPosition}px`
    );
  }

  function updateCarouselIndex(newPosition: number): void {
    document.documentElement.style.setProperty("transition-duration", `300ms`);
    updateCarouselPosition(newPosition);
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
    // index = Math.floor(Math.abs(position) / (totalItemWidth / 2));
    // console.log("index", index * totalItemWidth);
    // position = index * totalItemWidth;
    // console.log("position", position);
    // updateCarouselIndex(-position);
    // console.log("updated value", index * itemWidth);
    // console.log(
    //   "position: ",
    //   Math.abs(position),
    //   "itemWidth: ",
    //   itemWidth,
    //   "result: ",
    //   Math.floor(Math.abs(position) / itemWidth)
    // );
  }

  function goToPreviousIndex(newIndex: number): void {}

  function goToNextIndex(newIndex: number): void {}

  function handleMouseLeave(event: React.MouseEvent): void {
    isMouseLocked = false;
  }

  return (
    <div
      className="container"
      id="carousel"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="carousel"

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
