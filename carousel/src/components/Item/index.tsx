import { ReactNode } from "react";
import "./styles.css";

interface ItemProps {
  children: ReactNode;
}

const Item = ({ children }: ItemProps): JSX.Element => {
  return <li className="item">{children}</li>;
};

export default Item;
