import { removeUser, useAppDispatch, useAppSelector } from '../../store';
import { Button } from '../atoms/Button/Button';

import pic from '../../assets/img/user.png';

import styles from './Profile.module.css';
import { useNavigate } from 'react-router-dom';

import { removeAuthorization } from '../../store/slices/AuthorizationSlice';
import { useEffect, useState } from 'react';

export const ProfilePicSignOut = () => {
  const { photo } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userPic, setUserPic] = useState(pic);

  useEffect(() => {
    if (photo) {
      setUserPic(photo);
    }
  }, [photo]);

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
        <div className={styles.button_size}>
          <Button btnType="outlined" onClick={handleSignOut}>
            Выйти
          </Button>
        </div>
        <div className={styles.small_text}>Не менее 500x500 px</div>
      </div>
      <div className={styles.balance}>баланс</div>
    </div>
  );
};
