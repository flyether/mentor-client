import { useNavigate } from 'react-router-dom';
import userPic from '../../assets/img/user.png';
import { useAppSelector } from '../../store';
import { Button } from '../atoms/Button/Button';

import styles from './styles.module.css';

export const Header = () => {
  const { lastName, name } = useAppSelector((state) => state.user);
  const { authorization } = useAppSelector((state) => state.authorization);
  const navigate = useNavigate();
  const login = () => {
    navigate('/login', { replace: true });
  };
  const main = () => {
    navigate('/', { replace: true });
  };
  const profile = () => {
    navigate('/profile', { replace: true });
  };

  return (
    <footer className={styles.header}>
      <div aria-hidden={true} onClick={main} className={styles.button_logo} />

      {authorization ? (
        <div className={styles.row}>
          <div className={styles.name}>
            {name} {lastName}
          </div>
          <div aria-hidden={true} onClick={profile}>
            <img src={userPic} className={styles.user__pick} alt="user pic" />
          </div>
        </div>
      ) : (
        <Button onClick={login}>Войти</Button>
      )}
    </footer>
  );
};
