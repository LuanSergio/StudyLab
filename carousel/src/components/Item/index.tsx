import { ReactNode, memo } from "react";
import "./styles.css";

interface ItemProps {
  label?: string;
  children: ReactNode;
}

function Item({ children, label }: ItemProps): JSX.Element {
  return (
    <li className="item" aria-roledescription="slide" aria-label={label}>
      {children}
    </li>
  );
}

export default memo(Item);
