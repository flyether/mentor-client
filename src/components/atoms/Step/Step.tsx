import { FC } from 'react';

import styles from './style.module.css';

type Props = {
  img: string;
  title: string;
  text: string;
  number: string;
};

export const Step: FC<Props> = ({ img, text, title, number }) => {
  return (
    <div
      style={{
        background: `url(${img}), linear-gradient(98.19deg, #693195 8.79%, #56009a 96.11%) `,
      }}
      className={styles.container}
    >
      <div className={styles.textWrapper}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
      </div>
      <div className={styles.number}>{number}</div>
    </div>
  );
};
