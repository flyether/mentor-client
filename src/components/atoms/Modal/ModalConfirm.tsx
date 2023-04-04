import { FC, useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { ErrorModal } from '.';
import { VerificationToken } from '../../../models';
import { setRoleStor, setUserAuthorization, useAppDispatch } from '../../../store';
import { AuthorizationUserAPI } from '../../../store/services/UserService';
import { Button } from '../Button/Button';

import styles from './Modal.module.css';

export const ModalConfirm: FC = () => {
  const [verificationTokenPost, { error, isLoading }] =
    AuthorizationUserAPI.useVerificationTokenPostMutation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const [isErrorModal, setErrorModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error && 'data' in error) {
      setErrorModal(true);
    } else {
      setErrorModal(false);
    }
  }, [error]);

  const handleClick = async () => {
    if (token) {
      const VerToken: VerificationToken = {
        verificationToken: token,
      };
      const res = await verificationTokenPost(VerToken).unwrap();
      if (res) {
        localStorage.setItem('authorization', 'authorization');
        dispatch(setUserAuthorization('authorization'));
        localStorage.setItem('role', res.role);
        dispatch(setRoleStor(res.role));
        navigate('/profile', { replace: true });
      }
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className={styles.Modal}>
      {isErrorModal && (
        <ErrorModal message={'что-то пошло не так'} close={() => setErrorModal(false)} />
      )}
      <div className={styles.errorMessage}>
        <p>Ура! Получилось :) Почта успешно подтверждена</p>
      </div>
      <Button type="submit" onClick={handleClick}>
        Войти
      </Button>
    </div>
  );
};
