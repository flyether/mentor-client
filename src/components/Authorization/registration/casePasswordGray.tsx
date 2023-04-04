import styles from './casePassword.module.css';

export const CasePasswordGray = () => {
  const Ok = () => {
    return <div className={styles.ok__gray}>✔</div>;
  };
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
