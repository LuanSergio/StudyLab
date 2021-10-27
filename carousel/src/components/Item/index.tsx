import { ReactNode, memo } from "react";
import "./styles.css";

interface ItemProps {
  children: ReactNode;
}

function Item({ children }: ItemProps): JSX.Element {
  return <li className="item">{children}</li>;
}

export default memo(Item);
