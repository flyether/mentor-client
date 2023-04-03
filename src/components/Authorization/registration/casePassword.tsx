import { FC } from 'react';

import styles from './casePassword.module.css';

export const CasePassword: FC<{ message: string | undefined }> = ({ message }) => {
  const Ok = () => {
    return <div className={styles.ok}>✔</div>;
  };
  const NotOk = () => {
    return <div className={styles.not__ok}>✖</div>;
  };
  if (message) {
    return (
      <div className={styles.div}>
        <div className={styles.ok__check}>
          <div className={styles.row}>
            {['1', '2', '3', '4', '5', '13', '9', '17'].includes(message) ? <NotOk /> : <Ok />}
            Минимум 8 символов
          </div>
          <div className={styles.row}>
            {['1', '2', '3', '4', '5', '6', '7', '8'].includes(message) ? <NotOk /> : <Ok />}
            Минимум одна заглавная буква
          </div>
          <div className={styles.row}>
            {['1', '2', '4', '6', '10', '12', '13'].includes(message) ? <NotOk /> : <Ok />}Минимум
            одна цифра
          </div>
          <div className={styles.row}>
            {['1', '2', '3', '7', '9', '10', '11', '15'].includes(message) ? <NotOk /> : <Ok />}
            Только латинские буквы и цифры
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.div}>
      <div className={styles.ok__check}>
        <div className={styles.row}>
          <Ok />
          Минимум 8 символов
        </div>
        <div className={styles.row}>
          <Ok />
          Минимум одна заглавная буква
        </div>
        <div className={styles.row}>
          <Ok />
          Минимум одна цифра
        </div>
        <div className={styles.row}>
          <Ok />
          Только латинские буквы
        </div>
      </div>
    </div>
  );
};
