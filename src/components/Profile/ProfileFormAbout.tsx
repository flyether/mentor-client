import { ChangeEvent, FormEventHandler, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store';
import cnBind from 'classnames/bind';
import styles from '../Authorization/registration/registration.module.css';
import stylesForm from './Form.module.css';
import {
  setUpdateAbout,
  setUpdateUserLastName,
  setUpdateUserName,
} from '../../store/slices/UserUpdateSlice';

const cx = cnBind.bind(styles);

const ProfileFormAbout = () => {
  const { lastName, name } = useAppSelector((state) => state.user);
  const [focusStyleName, setFocusStyleName] = useState(false);
  const [focusStyleLastName, setFocusStylesLastName] = useState(false);
  const dispatch = useAppDispatch();

  const [nameInput, setNameInput] = useState(name);
  const [lastNameInput, setLastNameInput] = useState(lastName);
  const {
    register,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const handleBlurName = () => {
    setFocusStyleName(false);
    trigger('name');
  };

  const handleBlurLastName = () => {
    setFocusStyleName(false);
    trigger('lastName');
  };

  const handleDescriptionChange: FormEventHandler<HTMLTextAreaElement> = (event) => {
    dispatch(setUpdateAbout(event.currentTarget.value));
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNameInput(event.target.value);
    clearErrors('name');
    dispatch(setUpdateUserName(event.target.value));
  };
  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastNameInput(event.target.value);
    clearErrors('lastName');
    dispatch(setUpdateUserLastName(event.target.value));
  };

  return (
    <>
      <div className={stylesForm.title}>Обо мне</div>
      <div className={styles.inputs_wrapper}>
        <div className={stylesForm.wrapper}>
          <div className={stylesForm.container}>
            <div className={stylesForm.text}>Имя</div>
            <input
              type="text"
              value={nameInput}
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
                required: 'Поле «Имя» должно быть заполнено обязательно',
              })}
              onInput={handleNameChange}
              onFocus={() => setFocusStyleName(true)}
              onBlur={handleBlurName}
              placeholder="Имя"
            />
            <div className={styles.errorDivWrapper}>
              {errors?.name && (
                <div className={styles.errorDiv}>
                  {(errors?.name?.message as string) || 'ошибка не продуманая'}
                </div>
              )}
            </div>
          </div>
          <div className={stylesForm.container}>
            <div className={stylesForm.text}>Фамилия</div>
            <input
              type="text"
              value={lastNameInput}
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
              onInput={handleLastNameChange}
              onFocus={() => setFocusStylesLastName(true)}
              onBlur={handleBlurLastName}
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
        </div>
        <div className={stylesForm.text}>Расскажи о себе</div>
        <textarea
          onInput={handleDescriptionChange}
          className={stylesForm.textarea}
          {...register('about')}
          placeholder="Опиши, чем ты можешь быть полезен менти"
        />
      </div>
    </>
  );
};

export default ProfileFormAbout;
