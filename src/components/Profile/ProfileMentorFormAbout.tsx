import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store';

import cnBind from 'classnames/bind';
import styles from '../Authorization/registration/registration.module.css';
import stylesForm from './Form.module.css';
import { InitialValues } from '../../models';
import {
  setUpdateDescription,
  setUpdateUserLastName,
  setUpdateUserName,
} from '../../store/slices/UserUpdateSlice';

const cx = cnBind.bind(styles);

const ProfileMentorFormAbout = () => {
  const { lastName, name } = useAppSelector((state) => state.user);
  const [focusStyleName, setFocusStyleName] = useState(false);
  const [focusStyleLastName, setFocusStylesLastName] = useState(false);
  const dispatch = useAppDispatch();
  const [initialValues, setInitialValues] = useState<InitialValues | undefined>(undefined);
  const {
    register,
    clearErrors,
    trigger,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  useEffect(() => {
    setInitialValues({
      lastName: lastName,
      name: name,
    });
  }, [name, lastName]);

  const handleBlurName = () => {
    setFocusStyleName(false);
    const nameValue = getValues('name');
    if (!nameValue) {
      setValue('name', initialValues?.name || '');
    }
    trigger('name');
  };
  const handleBlurLastName = () => {
    setFocusStyleName(false);
    const nameValue = getValues('lastName');
    if (!nameValue) {
      setValue('lastName', initialValues?.lastName || '');
    }
    trigger('lastName');
  };

  const handleDescriptionChange: FormEventHandler<HTMLTextAreaElement> = (event) => {
    dispatch(setUpdateDescription(event.currentTarget.value));
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    clearErrors('name');
    setValue('name', event.target.value ?? initialValues?.name);
    dispatch(setUpdateUserName(event.target.value));
  };
  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    clearErrors('lastName');
    dispatch(setUpdateUserLastName(event.target.value));
  };

  return (
    <form className={stylesForm.form}>
      <div className={styles.inputs_wrapper}>
        <div className={stylesForm.wrapper}>
          <div className={stylesForm.container}>
            <div className={stylesForm.text}>Имя</div>
            <input
              type="text"
              defaultValue={initialValues?.name}
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
              defaultValue={initialValues?.lastName}
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
          {...register('description')}
          placeholder="Опиши, чем ты можешь быть полезен менти"
        />
      </div>
    </form>
  );
};

export default ProfileMentorFormAbout;
