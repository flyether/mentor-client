import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormLogin } from '../../components/Authorization/login';
import { useAppSelector } from '../../store';

import styles from './loginPage.module.css';

const LoginPage = () => {
  const { authorization } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (authorization) {
      navigate('/', { replace: true });
    }
  }, [authorization, navigate]);

  return (
    <div className={styles.container}>
      <FormLogin />
    </div>
  );
};
export default LoginPage;
