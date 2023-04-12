import { useAppDispatch, useAppSelector } from '../../store';
import { Button } from '../atoms/Button/Button';

import styles from './Profile.module.css';
import { useEffect, useState } from 'react';
import ProfileFormAbout from './ProfileFormAbout';
import { CheckFree, ProfilePicSignOut, ProfileExperience, ProfileEducation } from '.';
import MentorSkills from './MentorSkills';
import ProfileFormLangPrice from './ProfileFormLangPrice';
import TestInterviews from './TestInterviews';
import { setUpdateFreeConsultation } from '../../store/slices/UserUpdateSlice';

export const ProfileMentor = () => {
  const [isCheckedFree, setIsCheckedFree] = useState(false);
  const { freeConsultation } = useAppSelector((state) => state.user);
  const updateUser = useAppSelector((state) => state.updateUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (freeConsultation) {
      setIsCheckedFree(true);
    }
  }, [freeConsultation]);

  const handleCheckboxFree = (checked: boolean) => {
    setIsCheckedFree(checked);
    dispatch(setUpdateFreeConsultation(checked));
  };

  const handleSubmit = () => {
    console.log(updateUser);
  };

  return (
    <div className={styles.container}>
      <ProfilePicSignOut />
      <TestInterviews />
      <div className={styles.wrapper__up}>
        <div className={styles.colum}>
          <ProfileFormAbout />
          <ProfileFormLangPrice />
          <div className={styles.row}>
            <div className={styles.text}>Я, провожу бесплатные консультации</div>
            <CheckFree checked={isCheckedFree} onChange={handleCheckboxFree} />
          </div>
        </div>
      </div>
      <div className={styles.wrapper__up}>
        <div className={styles.colum}>
          <MentorSkills />
          <ProfileExperience />
          <ProfileEducation />
          <div className={styles.button__submit}>
            <Button onClick={handleSubmit} type="submit">
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
