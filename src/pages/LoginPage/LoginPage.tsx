import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormLogin } from '../../components/Authorization/login';
import { useAppSelector } from '../../store';

import styles from './loginPage.module.css';

const LoginPage = () => {
  const { authorization } = useAppSelector((state) => state.authorization);
  const navigate = useNavigate();

  useEffect(() => {
    if (authorization) {
      navigate('/profile', { replace: true });
    }
  }, [authorization, navigate]);

  return (
    <div className={styles.container}>
      <FormLogin />
    </div>
  );
};
export default LoginPage;
