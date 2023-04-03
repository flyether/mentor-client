import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import cnBind from 'classnames/bind';

import { useAppSelector } from '../../../store';
import { Button } from '../../atoms/Button/Button';

import styles from './registration.module.css';
import arrow from '../../../assets/svg/arrow-left.svg';
import { Step1Registration } from '.';
import { RegData } from '../../../models';
import { AuthorizationUserAPI } from '../../../store/services/UserService';
import { Modal } from '../../atoms/Modal';

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
                pattern: /[a-zA-Zа-яА-Я]$/,
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
                  {(errors?.email?.message as string) ||
                    'Поле "Имя" должно содержать   буквы киоиллицы илм латинского алфавита'}
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
                pattern: /[a-zA-Zа-яА-Я]$/,
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
                <div className={styles.errorDiv}> Поле не может быть пустым </div>
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
