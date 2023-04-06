import React, { FC, useState, useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import cnBind from 'classnames/bind';
import cn from 'classnames';

import { setUserAuthorization, useAppDispatch } from '../../../store';
import { Step2Registration } from './step2Registration';
import { Button } from '../../atoms/Button/Button';

import styles from './registration.module.css';
import { setRegEmail, setRegPassword, setRegRole } from '../../../store/slices/RegSlice';
import { PASSWORD_REGEX } from '../../../models/constants';
import { validationOnChange } from '../../../utils/validation';
import { CasePassword, CasePasswordGray } from '.';

const cx = cnBind.bind(styles);

export const Step1Registration: FC = () => {
  const [isStep2, setIsStep2] = useState(false);
  const [isMentor, setIsMentor] = useState(false);
  const [isMenty, setIsMenty] = useState(true);
  const [role, setRole] = useState('mentee');
  const dispatch = useAppDispatch();
  const [focusStyleEmail, setFocusStyleEmail] = useState(false);
  const [focusStylePassword, setFocusPassword] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    trigger,
    setValue,
    setError,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

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

  const submitForm = async (data: FieldValues) => {
    dispatch(setRegEmail(data.email));
    dispatch(setRegPassword(data.password));
    dispatch(setRegRole(role));
    setIsStep2(true);
    localStorage.setItem('role', role);
    dispatch(setUserAuthorization(role));
  };

  if (isStep2) {
    return <Step2Registration />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Регистрация</h1>
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

      <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
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
                {(errors.email?.message as string) || 'Введите корректный e-mail'}
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
              pattern: PASSWORD_REGEX,
              required: 'Поле не может быть пустым',
            })}
            onFocus={() => setFocusPassword(true)}
            onInput={handlePasswordChange}
            onBlur={() => {
              trigger('password');
            }}
            placeholder="Пароль"
          />
          <button
            type="button"
            className={cx(styles.eye_register, {
              [styles.eye]: passwordShown,
              [styles.eye__open]: !passwordShown,
            })}
            onClick={togglePasswordVisibility}
          />
          {errors?.passwordOn ? (
            <CasePassword message={errors?.passwordOn?.message as string} />
          ) : (
            <CasePasswordGray />
          )}
        </div>
        <Button type="submit" size="xl">
          Далее
        </Button>
      </form>
    </div>
  );
};
