import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store';
import cnBind from 'classnames/bind';
import styles from '../Authorization/registration/registration.module.css';
import stylesForm from './Form.module.css';
import stylesProfile from './Profile.module.css';
import {
  setUpdateExperienceOrganization,
  setUpdateExperiencePosition,
  setUpdateExperienceVerified,
  setUpdateExperienceYears,
} from '../../store/slices/UserUpdateSlice';

const cx = cnBind.bind(styles);

export const ProfileExperience = () => {
  const { experience } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [focusStyleOrganization, setFocusStyleOrganization] = useState(false);
  const [organizationInput, setOrganizationInput] = useState(experience?.organization);
  const [focusStylePosition, setFocusStylePosition] = useState(false);
  const [positionInput, setPositionInput] = useState(experience?.position);
  const [focusStyleYears, setFocusStyleYears] = useState(false);
  const [yearsInput, setYearsInput] = useState(experience?.years);

  const {
    register,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const handleBlurOrganization = () => {
    setFocusStyleOrganization(false);
    trigger('organization');
  };

  const handleOrganizationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOrganizationInput(event.target.value);
    clearErrors('organization');
    dispatch(setUpdateExperienceOrganization(event.target.value));
  };
  const handleBlurPosition = () => {
    setFocusStylePosition(false);
    trigger('position');
  };

  const handlePositionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPositionInput(event.target.value);
    clearErrors('position');
    dispatch(setUpdateExperiencePosition(event.target.value));
  };

  const handleBlurYears = () => {
    setFocusStyleYears(false);
    trigger('years');
  };

  const handleYearsChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setYearsInput(event.target.value);
    clearErrors('years');
    dispatch(setUpdateExperienceYears(event.target.value));
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      const formData = new FormData();
      formData.append('files', image);
      dispatch(setUpdateExperienceVerified(formData));
    }
  };

  return (
    <>
      <div className={stylesForm.title}>Работа</div>
      <div className={stylesForm.text}>Место работы</div>
      <input
        type="text"
        value={organizationInput}
        className={cx(`${styles.input} ${stylesForm.margin}`, {
          [styles.inputError]: errors.organization,
          [styles.focusStyle]: focusStyleOrganization,
        })}
        {...register('organization')}
        onInput={handleOrganizationChange}
        onFocus={() => setFocusStyleOrganization(true)}
        onBlur={handleBlurOrganization}
        placeholder="Место работы"
      />
      <div className={stylesForm.text}>Должность</div>
      <input
        type="text"
        value={positionInput}
        className={cx(`${styles.input} ${stylesForm.margin}`, {
          [styles.inputError]: errors.position,
          [styles.focusStyle]: focusStylePosition,
        })}
        {...register('position')}
        onInput={handlePositionChange}
        onFocus={() => setFocusStylePosition(true)}
        onBlur={handleBlurPosition}
        placeholder="Должность"
      />
      <div className={stylesForm.text}>Oпыт</div>
      <select
        value={yearsInput}
        className={cx(`${styles.input} ${stylesForm.margin}`, {
          [styles.inputError]: errors.years,
          [styles.focusStyle]: focusStyleYears,
        })}
        {...register('years')}
        onChange={handleYearsChange}
        onFocus={() => setFocusStyleYears(true)}
        onBlur={handleBlurYears}
        placeholder="Опыт работы"
      >
        <option value="">{yearsInput ?? 'Выберите опыт работы'} </option>
        <option value="Менее 1 года">Менее 1 года</option>
        <option value="1 год">1 год</option>
        <option value="2 года">2 года</option>
        <option value="3 года">3 года</option>
        <option value="4 года">4 года</option>
        <option value="5 лет">5 лет</option>
        <option value="Более 5 лет">Более 5 лет</option>
      </select>
      <div className={stylesProfile.wrapper__upload}>
        <input
          className={stylesProfile.upload}
          type="file"
          accept="image/*"
          multiple={false}
          onChange={handleFileSelect}
          id="upload-file"
        />
        <div className={stylesForm.text__plus}>+</div>
        <div className={stylesForm.text}>
          Загрузи документы в PDF или JPEG, и мы дадим тебе галочку в профиле
        </div>
      </div>
    </>
  );
};
