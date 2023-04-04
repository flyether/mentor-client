import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalConfirm } from '../../components/atoms/Modal/ModalConfirm';
import { useAppSelector } from '../../store';

import styles from '../LoginPage/loginPage.module.css';

const EmailConfirmation = () => {
  const { authorization } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (authorization) {
      navigate('/', { replace: true });
    }
  }, [authorization, navigate]);

  return (
    <div className={styles.container}>
      <ModalConfirm />
    </div>
  );
};
export default EmailConfirmation;
