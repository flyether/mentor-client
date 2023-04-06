import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store';

import cnBind from 'classnames/bind';
import styles from '../Authorization/registration/registration.module.css';
import stylesForm from './Form.module.css';
import { setUpdateSkills } from '../../store/slices/UserUpdateSlice';

const cx = cnBind.bind(styles);

const MentorSkills = () => {
  const { lastName, name } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const [coastDollar, setCoastDollar] = useState(false);
  const [skillsInput, setSkillsInput] = useState(lastName);
  const [focusStyleSkills, setFocusStylesSkills] = useState(false);
  const {
    register,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const handleSkillsChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setUpdateSkills(skillsInput));
  };
  return (
    <input
      type="text"
      value={skillsInput}
      className={cx(styles.input, {
        [styles.inputError]: errors.name,
        [styles.focusStyle]: focusStyleSkills,
      })}
      {...register('skills', {
        minLength: 2,
        pattern: {
          value: /[a-zA-Zа-яА-Я]$/,
          message: 'Поле "Имя" должно содержать   буквы кириллицы илм латинского алфавита',
        },
        required: 'Поле «Имя» должно быть заполнено обязательно',
      })}
      onInput={handleSkillsChange}
      onFocus={() => setFocusStylesSkills(true)}
      placeholder="Имя"
    />
  );
};

export default MentorSkills;
