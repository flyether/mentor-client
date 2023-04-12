import { useAppDispatch, useAppSelector } from '../../store';
import styles from './Profile.module.css';

import { useEffect, useState } from 'react';

import { CheckInterviews } from '.';
import { setUpdateFreeInterviews } from '../../store/slices/UserUpdateSlice';

const TestInterviews = () => {
  const { freeInterviews } = useAppSelector((state) => state.user);
  const [isCheckedInterviews, setIsCheckedInterviews] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (freeInterviews) {
      setIsCheckedInterviews(true);
    }
  }, [freeInterviews]);

  const handleCheckboxInterviews = (checked: boolean) => {
    setIsCheckedInterviews(checked);
    dispatch(setUpdateFreeInterviews(checked));
  };

  return (
    <div className={styles.wrapper__up}>
      <div className={styles.text__block}>
        <div className={styles.title}>Я провожу тестовые собеседования</div>
        <div className={styles.text}>
          Тестовые собеседования нужны менти, чтобы выявить его сильные и слабые стороны, получить
          рекомендации опытного специалиста и подготовиться к реальному собеседованию при найме
        </div>
      </div>
      <CheckInterviews checked={isCheckedInterviews} onChange={handleCheckboxInterviews} />
    </div>
  );
};

export default TestInterviews;
