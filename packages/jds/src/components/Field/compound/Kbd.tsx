import { clsx } from "clsx";

import { Kbd } from "../../Kbd";
import * as styles from "../field.css";
import type { FieldKbdProps } from "../field.types";

export const FieldKbd = ({ keys, disabled = false }: FieldKbdProps) => (
  <span className={clsx(styles.contentSlot, styles.kbdGroup)}>
    {/* 같은 키가 반복될 수 있으므로 index를 key로 사용한다. */}
    {keys.map((key, index) => (
      <Kbd key={index} type='function' size='sm' isMuted={disabled}>
        {key}
      </Kbd>
    ))}
  </span>
);

FieldKbd.displayName = "FieldKbd";
