import { removeUser, useAppDispatch, useAppSelector } from '../../store';
import { Button } from '../atoms/Button/Button';

import userPic from '../../assets/img/user.png';

import styles from './Profile.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ProfileMentorFormAbout from './ProfileMentorFormAbout';
import { CheckFree, CheckInterviews } from '.';
import MentorSkills from './MentorSkills';
import { removeAuthorization } from '../../store/slices/AuthorizationSlice';

const ProfileMentor = () => {
  const { lastName, name } = useAppSelector((state) => state.user);
  const [isCheckedInterviews, setIsCheckedInterviews] = useState(false);
  const [isCheckedFree, setIsCheckedFree] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCheckboxInterviews = (checked: boolean) => {
    setIsCheckedInterviews(checked);
  };
  const handleCheckboxFree = (checked1: boolean) => {
    setIsCheckedFree(checked1);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      const formData = new FormData();
      formData.append('files', image);
    }
  };
  const handleSignOut = () => {
    navigate('/login', { replace: true });
    dispatch(removeUser());
    dispatch(removeAuthorization());
    localStorage.removeItem('user');
    localStorage.removeItem('authorization');
    localStorage.removeItem('role');
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper__up}>
        <div className={styles.userPik__withButton}>
          <div className={styles.userPik}>
            <div className={styles.user__pick}>
              <img src={userPic} className={styles.user__pick} alt="user pic" />
              <input
                className={styles.user__upload}
                type="file"
                accept="image/*"
                multiple={false}
                onChange={handleFileSelect}
                id="upload-file"
              />
              <div className={styles.svg}>
                <svg className={styles.svg__upload} />
              </div>
            </div>
          </div>
          <Button btnType="outlined" onClick={handleSignOut}>
            Выйти
          </Button>
          <div className={styles.small_text}>Не менее 500x500 px</div>
        </div>
        <div className={styles.balance}>баланс</div>
      </div>
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
      <div className={styles.wrapper__up}>
        <div className={styles.colum}>
          <div className={styles.title}>Обо мне</div>

          <ProfileMentorFormAbout />
          <div className={styles.row}>
            <div className={styles.text}>Я, провожу бесплатные консультации</div>
            <CheckFree checked={isCheckedFree} onChange={handleCheckboxFree} />
          </div>
        </div>
      </div>
      <div className={styles.wrapper__up}>
        <div className={styles.colum}>
          <div className={styles.title}>Ключевые навыки</div>
          <MentorSkills />
        </div>
      </div>
    </div>
  );
};

export default ProfileMentor;
