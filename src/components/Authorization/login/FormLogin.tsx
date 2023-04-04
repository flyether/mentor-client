import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import cnBind from 'classnames/bind';
import cn from 'classnames';

import { AuthorizationUserAPI } from '../../../store/services/UserService';
import { AuthorizationData } from '../../../models';
// import { ErrorModal } from '../../atoms/Modal';
import { Button } from '../../atoms/Button/Button';
import { ForgotPassword } from './forgot-password';

import styles from '../registration/registration.module.css';
import { setRoleStor, setUserAuthorization, useAppDispatch } from '../../../store';

const cx = cnBind.bind(styles);

const FormLogin: FC = () => {
  const dispatch = useAppDispatch();
  const [authorizationUser] = AuthorizationUserAPI.useAuthorizationUserMutation();
  const navigate = useNavigate();
  const [isMentor, setIsMentor] = useState(false);
  const [isMenty, setIsMenty] = useState(true);
  const [role, setRole] = useState('mentee');
  const [isForgot, setForgot] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [focusStyleEmail, setFocusStyleEmail] = useState(false);
  const [focusStylePassword, setFocusPassword] = useState(false);
  const {
    register,
    handleSubmit,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (isMentor) {
      setRole('mentor');
    }
    if (isMenty) {
      setRole('mentee');
    }
  }, [isMentor, isMenty]);

  const handleMentor = () => {
    setIsMentor(true);
    setIsMenty(false);
  };
  const handleMenty = () => {
    setIsMenty(true);
    setIsMentor(false);
  };
  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const submitForm = async (data: FieldValues) => {
    const userData: AuthorizationData = {
      role: role,
      email: data.email,
      password: data.password,
    };

    const res = await authorizationUser(userData).unwrap();
    if (res) {
      localStorage.setItem('authorization', 'authorization');
      dispatch(setUserAuthorization('authorization'));
      localStorage.setItem('role', role);
      dispatch(setRoleStor(role));
      localStorage.setItem('user', JSON.stringify(res.user));
    }

    // navigate('/profile', { replace: true });
  };
  const handleForgot = () => setForgot(true);

  if (isForgot) {
    return <ForgotPassword />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttons_wrapper}>
        <button
          onClick={handleMentor}
          type="button"
          className={cn(styles.button_select, { [styles.button_active]: isMentor })}
        >
          Ментор
        </button>
        <button
          onClick={handleMenty}
          type="button"
          className={cn(styles.button_select, { [styles.button_active]: isMenty })}
        >
          Менти
        </button>
      </div>
      <h1 className={styles.heading}>Войти в аккаунт</h1>
      <form onSubmit={handleSubmit(submitForm)} className={styles.form}>
        <div className={styles.inputs_wrapper}>
          <input
            type="text"
            className={cx(styles.input, {
              [styles.inputError]: errors.email,
              [styles.focusStyle]: focusStyleEmail,
            })}
            {...register('email', {
              minLength: 4,
              pattern: /^[\w.%+-]+@[\w.-]+\.[a-zA-Zа-яА-Я]{2,}$/,
              required: 'Поле E-mail должно быть заполнено',
            })}
            onInput={() => clearErrors('email')}
            onFocus={() => setFocusStyleEmail(true)}
            onBlur={() => {
              setFocusStyleEmail(false);
              trigger('email');
            }}
            placeholder="E-mail"
          />
          <div className={styles.errorDivWrapper}>
            {errors?.email && (
              <div className={styles.errorDiv}>
                {(errors.email.message as string) || 'Введите корректный E-mail'}
              </div>
            )}
          </div>
          <input
            type={passwordShown ? 'text' : 'password'}
            className={cx(styles.input, {
              [styles.inputError]: errors.password,
              [styles.focusStyle]: focusStylePassword,
            })}
            {...register('password', {
              minLength: {
                value: 8,
                message: 'Пароль должен содержать не менее 8 символов',
              },
              required: 'Поле «Пароль» должно быть заполнено',
            })}
            onInput={() => clearErrors('password')}
            onFocus={() => setFocusPassword(true)}
            onBlur={() => {
              setFocusPassword(false);
              trigger('password');
            }}
            placeholder="Пароль"
          />
          <button
            type="button"
            className={cx({
              [styles.eye]: passwordShown,
              [styles.eye__open]: !passwordShown,
            })}
            onClick={togglePasswordVisibility}
          />
          <div className={styles.errorDivWrapper}>
            {errors?.password && (
              <div className={styles.errorDiv}>
                {(errors.password.message as string) || 'Поле Пароль должно быть заполнено'}
              </div>
            )}
          </div>
        </div>

        <Button type="submit" size="xl">
          Войти
        </Button>

        <button onClick={handleForgot} type="button" className={styles.button_forgot}>
          Я забыл пароль
        </button>

        <Link to="/registration" className={styles.button}>
          Создать аккаунт
        </Link>
      </form>
    </div>
  );
};

export { FormLogin };
