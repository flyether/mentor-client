import { FC } from 'react';
import { PropsModal } from '../../../models';
import styles from './Modal.module.css';

export const Modal: FC<PropsModal> = ({ message, close }) => (
  <div className={styles.Modal} onClick={close}>
    <div className={styles.errorMessage}>
      <p>{message}</p>
    </div>
  </div>
);
