import { type ReactNode } from "react";

import { CardTitle, CardBody } from "../compound";
import * as styles from "../compound/card.css";

interface TitleBodyProps {
  title: string;
  body: ReactNode;
}

export const TitleBody = ({ title, body }: TitleBodyProps) => (
  <div className={styles.contentGroup}>
    <CardTitle>{title}</CardTitle>
    <CardBody>{body}</CardBody>
  </div>
);
