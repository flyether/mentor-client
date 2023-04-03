import { FC, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PASSWORD_REGEX } from '../../../models/constants';
import { validationOnChange } from '../../../utils/validation';
import { CasePassword } from '../registration';
import cnBind from 'classnames/bind';
import styles from '../registration/registration.module.css';
const cx = cnBind.bind(styles);

export const ForgotPassword2: FC = () => {
  const [isModalActive, setModalActive] = useState(false);
  const navigate = useNavigate();
  const [isErrorMessage, setErrorMessage] = useState('');

  const [focusStylePassword, setFocusPassword] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorConfirmation, setErrorConfirmation] = useState(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    setError,
    trigger,
    formState: { errors, isValid },
  } = useForm({ mode: 'onBlur' });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors('password');
    clearErrors('passwordOn');
    const passwordVal = e.target.value;

    setValue('password', passwordVal);
    validationOnChange
      .validateAt('password', { password: passwordVal })
      .then(() => {
        clearErrors('passwordOn');
      })
      .catch((err) => {
        setError('passwordOn', { message: err.message });
      });
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  // useEffect(() => {
  //   if (error && 'data' in error) {
  //     setErrorMessage('Что-то пошло не так. Обновите страницу через некоторое время');
  //     setModalActive(true);
  //   } else {
  //     setModalActive(false);
  //   }
  // }, [error]);

  const submitForm = async (data: FieldValues) => {
    if (data.password !== data.passwordConfirmation) {
      setErrorConfirmation(true);
      return;
    }
    // dispatch(setPassword(data.password));
    navigate('/profile', { replace: true });
  };

  return (
    <div>
      {/* {isModalActive && (
        <ServerError close={() => setModalActive(false)} message={isErrorMessage} />
      )} */}
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
          <div className={styles.title}> Восстановление пароля </div>
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
              pattern: PASSWORD_REGEX,
              required: 'Поле не может быть пустым',
            })}
            onFocus={() => setFocusPassword(true)}
            onInput={handlePasswordChange}
            onBlur={() => {
              trigger('password');
            }}
            placeholder="Новый пароль"
          />
          <button
            type="button"
            className={cx(styles.eye_register, {
              [styles.eye]: passwordShown,
              [styles.eye__open]: !passwordShown,
            })}
            onClick={togglePasswordVisibility}
          />

          <CasePassword message={errors?.passwordOn?.message as string} />
          <input
            type="password"
            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
            {...register('ConfirmPassword', {
              minLength: {
                value: 8,
                message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
              },
              required: 'поле пароль должно быть заполненно ',
            })}
            onInput={() => clearErrors('ConfirmPassword')}
            placeholder="Повторите пароль"
          />
          <div className={styles.errorDivWrapper}>
            {errors?.ConfirmPassword && (
              <div className={styles.errorDiv}>
                {' '}
                {(errors.ConfirmPassword.message as string) ||
                  'поле пароль должно быть заполненно'}{' '}
              </div>
            )}
            {errorConfirmation && <div className={styles.errorDiv}>Пароли не совпадают</div>}
          </div>
          <button className={styles.button} disabled={!isValid} type="submit">
            {' '}
            СОХРАНИТЬ ИЗМЕНЕНИЯ
          </button>
          <div className={styles.registration}>
            <div className={styles.text_registration}>
              {' '}
              После сохранения войдите на страницу пользователя, используя новый пароль{' '}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
