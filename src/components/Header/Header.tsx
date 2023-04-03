import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { Button } from '../atoms/Button/Button';

import styles from './styles.module.css';

export const Header = () => {
  const { authorization } = useAppSelector((state) => state.user);
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
      <button onClick={main} className={styles.button_logo}>
        ЛОГО
      </button>
      {authorization ? (
        <Button onClick={profile}>Профиль</Button>
      ) : (
        <Button onClick={login}>Войти</Button>
      )}
    </footer>
  );
};
