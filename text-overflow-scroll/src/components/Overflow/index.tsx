import { ReactNode, useEffect, useRef, useState } from "react";
import "./styles.css";

interface OverflowProps {
  children: ReactNode;
}

const Overflow = ({ children }: OverflowProps): JSX.Element => {
  const [height, setHeight] = useState(0);
  const textRef = useRef<HTMLParagraphElement>(null);

  function getElementHeight(): void {
    textRef.current && setHeight(textRef.current.clientHeight);
  }

  useEffect(() => {
    getElementHeight();
  }, []);

  return (
    <>
      <div className={`overflow ${height > 300 ? "overflow--contained" : ""}`}>
        <p
          ref={textRef}
          className={height > 300 ? "overflow__content--contained" : ""}
        >
          {children}
        </p>
      </div>
      <p className="size">Content height: {height}</p>
    </>
  );
};

export default Overflow;
