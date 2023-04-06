import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store';
import { MultiSelect } from 'react-multi-select-component';
import cnBind from 'classnames/bind';
import styles from '../Authorization/registration/registration.module.css';
import stylesForm from './Form.module.css';
import {
  setUpdateCost,
  setUpdateDescription,
  setUpdateLanguage,
  setUpdateUserLastName,
  setUpdateUserName,
} from '../../store/slices/UserUpdateSlice';
import { options } from './utils/selectOptions';
import { SelectLanguage } from '../../models';

const cx = cnBind.bind(styles);

const ProfileMentorFormAbout = () => {
  const [selected, setSelected] = useState<SelectLanguage[]>([]);
  const { lastName, name } = useAppSelector((state) => state.user);
  const [focusStyleName, setFocusStyleName] = useState(false);
  const [focusStyleLastName, setFocusStylesLastName] = useState(false);
  const [focusStyleCost, setFocusCost] = useState(false);
  const dispatch = useAppDispatch();
  const [coastDollar, setCoastDollar] = useState(false);

  const [nameInput, setNameInput] = useState(name);
  const [lastNameInput, setLastNameInput] = useState(lastName);
  const {
    register,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  useEffect(() => {
    const newArray = selected.map((obj) => obj.value);
    dispatch(setUpdateLanguage(newArray));
  }, [dispatch, selected]);

  const handleBlurName = () => {
    setFocusStyleName(false);
    trigger('name');
  };

  const handleBlurLastName = () => {
    setFocusStyleName(false);
    trigger('lastName');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyValue = event.key;
    const regex = /^[0-9]+$/;

    if (!regex.test(keyValue)) {
      event.preventDefault();
    }
  };

  const handleCost = (event: ChangeEvent<HTMLInputElement>) => {
    let currency = 'rub';
    if (coastDollar) currency = 'dollar';
    const cost = {
      value: event.target.value.toString(),
      currency: currency,
    };
    dispatch(setUpdateCost(cost));
  };
  const toggleCost = () => {
    setCoastDollar(coastDollar ? false : true);
  };

  const handleDescriptionChange: FormEventHandler<HTMLTextAreaElement> = (event) => {
    dispatch(setUpdateDescription(event.currentTarget.value));
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
    <form className={stylesForm.form}>
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
          {...register('description')}
          placeholder="Опиши, чем ты можешь быть полезен менти"
        />
        <div className={stylesForm.text}>На каком языке ты хотел бы разговаривать с менти?</div>
        <MultiSelect
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy={'Выбирите язык'}
          isCreatable={true}
          hasSelectAll={false}
          className={stylesForm.input}
        />
        <div className={stylesForm.text}>Стоимость за 1 час</div>
        <div className={stylesForm.position}>
          <input
            type="text"
            inputMode="numeric"
            className={cx(`${styles.input} ${stylesForm.margin}`, {
              [styles.inputError]: errors.password,
              [styles.focusStyle]: focusStyleCost,
            })}
            {...register('cost')}
            onKeyDown={handleKeyPress}
            onFocus={() => setFocusCost(true)}
            onInput={handleCost}
            placeholder="Стоимость"
          />
          <button type="button" className={stylesForm.cost} onClick={toggleCost}>
            {coastDollar ? '$' : '₽'}
          </button>
        </div>
        <input name="highload1" type="checkbox" />
      </div>
    </form>
  );
};

export default ProfileMentorFormAbout;
