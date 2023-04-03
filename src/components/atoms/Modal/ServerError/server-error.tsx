import { FC, useEffect } from 'react';
import { PropsModalParent } from '../../../../models';

import styles from './errors.module.css';

export const ServerError: FC<PropsModalParent> = ({ message, close, closeParent }) => {
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     close();
  //     if (closeParent) closeParent();
  //   }, 4000);

  //   return () => clearTimeout(timer);
  // }, [close, closeParent]);

  return (
    <div className={styles.container}>
      <div className={styles.attention} />
      <span> {message}</span>
      <button
        data-test-id="alert-close"
        className={styles.cross__icon}
        type="button"
        onClick={() => {
          close();
          if (closeParent) closeParent();
        }}
      >
        ✖
      </button>
    </div>
  );
};
