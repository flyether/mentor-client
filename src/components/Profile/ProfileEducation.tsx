import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store';
import cnBind from 'classnames/bind';
import styles from '../Authorization/registration/registration.module.css';
import stylesForm from './Form.module.css';
import stylesProfile from './Profile.module.css';
import {
  setUpdateEducationYears,
  setUpdateEducationVerified,
  setUpdateEducationOrganization,
} from '../../store/slices/UserUpdateSlice';
import { optionsYears } from './utils/selectOptions';

const cx = cnBind.bind(styles);

export const ProfileEducation = () => {
  const { education } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [focusStyleOrganization, setFocusStyleOrganization] = useState(false);
  const [organizationInput, setOrganizationInput] = useState(education?.organization);
  const [focusStyleYears, setFocusStyleYears] = useState(false);
  const [yearsInput, setYearsInput] = useState(education?.years);

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
    dispatch(setUpdateEducationOrganization(event.target.value));
  };

  const handleBlurYears = () => {
    setFocusStyleYears(false);
    trigger('years');
  };

  const handleYearsChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setYearsInput(event.target.value);
    clearErrors('years');
    dispatch(setUpdateEducationYears(event.target.value));
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      const formData = new FormData();
      formData.append('files', image);
      dispatch(setUpdateEducationVerified(formData));
    }
  };

  return (
    <>
      <div className={`${stylesForm.title} ${stylesForm.margin__top}`}>Образование</div>
      <div className={stylesForm.text}>Учебное заведение</div>
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
        placeholder="Учебное заведение"
      />
      <div className={stylesForm.text}>Год окончания</div>
      <select
        value={yearsInput}
        className={cx(`${styles.input} ${stylesForm.margin}`, {
          [styles.inputError]: errors.experience,
          [styles.focusStyle]: focusStyleYears,
        })}
        {...register('years')}
        onChange={handleYearsChange}
        onFocus={() => setFocusStyleYears(true)}
        onBlur={handleBlurYears}
        placeholder="Опыт работы"
      >
        <option value="">{yearsInput ?? 'Год окончания'} </option>
        {optionsYears.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
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
