import { Children, ReactNode, useEffect, useState } from "react";
import "./styles.css";

interface CarouselProps {
  children: ReactNode;
  tagName?: keyof JSX.IntrinsicElements;
}

let isMouseLocked = false;
let initialPosition = 0;
let lastPosition = 0;

const Carousel = ({
  children,
  tagName = "div",
}: CarouselProps): JSX.Element => {
  const Tag = tagName as keyof JSX.IntrinsicElements;

  const [position, setPosition] = useState(0);

  function handleMouseDown(event: React.MouseEvent): void {
    event.preventDefault();
    isMouseLocked = true;
    initialPosition = event.clientX;
  }

  function handleMouseMove(event: React.MouseEvent): void {
    if (isMouseLocked) {
      const travelDistance = event.clientX - initialPosition;
      setPosition(travelDistance + lastPosition);
    }
  }

  function handleMouseUp(event: React.MouseEvent): void {
    event.preventDefault();
    lastPosition = position;
    isMouseLocked = false;
  }

  // function handleMouseLeave(event: React.MouseEvent): void {
  //   setIsMouseLocked(false);
  // }

  return (
    <div
      className="carousel"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      // onMouseLeave={handleMouseLeave}
    >
      <Tag
        className="carousel__items-holder"
        style={{ transform: `translateX(${position * 2}px)` }}
      >
        {children}
      </Tag>
    </div>
  );
};

export default Carousel;
