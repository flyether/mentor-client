import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Step1Registration } from '../../components/Authorization/registration';
import { useAppSelector } from '../../store';

import styles from '../LoginPage/loginPage.module.css';

const RegistrationPage = () => {
  const { authorization } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (authorization) {
      navigate('/', { replace: true });
    }
  }, [authorization, navigate]);

  return (
    <div className={styles.container}>
      <Step1Registration />
    </div>
  );
};
export default RegistrationPage;
