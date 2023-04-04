import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import cnBind from 'classnames/bind';

import { useAppSelector } from '../../../store';
import { Button } from '../../atoms/Button/Button';

import arrow from '../../../assets/svg/arrow-left.svg';
import { Step1Registration } from '.';
import { RegData } from '../../../models';
import { AuthorizationUserAPI } from '../../../store/services/UserService';
import { Modal } from '../../atoms/Modal';
import styles from './registration.module.css';
const cx = cnBind.bind(styles);

export const Step2Registration: FC = () => {
  const [regUser, { error }] = AuthorizationUserAPI.useRegUserMutation();
  const [isStep1, setIsStep1] = useState(false);
  const [isOkModal, setOkModal] = useState(false);
  const { password, email, role } = useAppSelector((state) => state.registration);
  const [focusStyleName, setFocusStyleName] = useState(false);
  const [focusStyleLastName, setFocusStylesLastName] = useState(false);

  const {
    register,
    trigger,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const submitForm = async (data: FieldValues) => {
    const sendData: RegData = {
      password: password,
      email: email,
      role: role,
      lastName: data.lastName,
      name: data.name,
    };
    const res = await regUser(sendData);
    if (res) {
      setOkModal(true);
    }
  };

  if (isStep1) {
    return <Step1Registration />;
  }

  return (
    <div>
      {isOkModal && (
        <Modal
          message={
            'Почти все! :)\
Осталось подтвердить почту —\
проверь свой почтовый ящик'
          }
          close={() => {}}
        />
      )}
      <div className={styles.container}>
        <h1 className={styles.heading}>
          <button onClick={() => setIsStep1(true)} type="button">
            <img src={arrow} alt="back" className={styles.arrow_back} />
          </button>
          Регистрация
        </h1>
        <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
          <div className={styles.inputs_wrapper}>
            <input
              type="text"
              className={cx(styles.input, {
                [styles.inputError]: errors.name,
                [styles.focusStyle]: focusStyleName,
              })}
              {...register('name', {
                minLength: 2,
                pattern: {
                  value: /[a-zA-Zа-яА-Я]$/,
                  message: 'Поле "Имя" должно содержать   буквы кириллицы илм латинского алфавита',
                },
                required: 'Поле «Имя» должно быть заполнено',
              })}
              onInput={() => clearErrors('name')}
              onFocus={() => setFocusStyleName(true)}
              onBlur={() => {
                setFocusStyleName(false);
                trigger('name');
              }}
              placeholder="Имя"
            />
            <div className={styles.errorDivWrapper}>
              {errors?.name && (
                <div className={styles.errorDiv}>
                  {(errors?.name?.message as string) || 'ошибка не продуманая'}
                </div>
              )}
            </div>
            <input
              type="text"
              className={cx(styles.input, {
                [styles.inputError]: errors.lastName,
                [styles.focusStyle]: focusStyleLastName,
              })}
              {...register('lastName', {
                minLength: 2,
                pattern: {
                  value: /[a-zA-Zа-яА-Я]$/,
                  message:
                    'Поле "Фамилия" должно содержать   буквы кириллицы илм латинского алфавита',
                },
                required: 'Поле «Фамилия» должно быть заполнено',
              })}
              onInput={() => clearErrors('lastName')}
              onFocus={() => setFocusStylesLastName(true)}
              onBlur={() => {
                setFocusStylesLastName(false);
                trigger('lastName');
              }}
              placeholder="Фамилия"
            />
            <div className={styles.errorDivWrapper}>
              {errors?.lastName && (
                <div className={styles.errorDiv}>
                  {(errors?.lastName?.message as string) || 'ошибка не продуманая'}
                </div>
              )}
            </div>
          </div>
          <Button type="submit" size="xl" mb="40px">
            Зарегистрироваться
          </Button>
          <div className={styles.policy_privacy_text}>
            Регистрируясь, ты соглашаешься с{' '}
            <Link to="/" className={styles.link}>
              политикой конфиденциальности
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
