import { FC, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../store';
import { FormLogin } from './FormLogin';

import styles from '../registration/registration.module.css';
import { ServerError } from '../../atoms/Modal/ServerError/server-error';

export const ForgotPassword: FC = () => {
  const dispatch = useAppDispatch();

  const [isModalActive, setModalActive] = useState(false);
  const [isLoginState, setLoginState] = useState(false);
  const [isErrorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({ mode: 'onBlur' });

  // useEffect(() => {
  //   if (error && 'data' in error) {
  //      setErrorMessage('Что-то пошло не так. Обновите страницу через некоторое время');
  //     setModalActive(true);
  //   } else {
  //     setModalActive(false);
  //   }
  // }, [error]);

  const submitForm = async (data: FieldValues) => {};

  const handeLogin = async () => {
    setLoginState(true);
  };

  if (isLoginState) {
    return <FormLogin />;
  }

  return (
    <div>
      {isModalActive && (
        <ServerError close={() => setModalActive(false)} message={isErrorMessage} />
      )}

      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
          <button onClick={handeLogin} type="button" className={styles.button}>
            назд к логину ➜
          </button>

          <div className={styles.div__padding}>
            <div className={styles.title}> Восстановление пароля </div>
            <input
              type="text"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              {...register('email', {
                minLength: 4,
                pattern: {
                  value: /^[\w.%+-]+@[\w.-]+\.[a-zA-Zа-яА-Я]{2,}$/,
                  message: 'Введите корректный e-mail',
                },
                required: 'Поле не может быть пустым',
              })}
              onInput={() => clearErrors('email')}
              placeholder="Email"
            />
            <div className={styles.errorDivWrapper}>
              {errors?.email ? (
                <div className={styles.errorDiv}>
                  {(errors.email?.message as string) || 'Введите корректный e-mail'}
                </div>
              ) : (
                <div>
                  На это email будет отправлено письмо с инструкциями по восстановлению пароля
                </div>
              )}
            </div>
            <div className={styles.margin} />
            <button className={styles.button} type="submit">
              ВОСТАНОВИТЬ
            </button>
            <div className={styles.registration}>
              <div className={styles.text_registration}> НЕТ УЧЕТНОЙ ЗАПИСИ? </div>
              <Link to="/registration" className={styles.button}>
                создать аккаунт
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
