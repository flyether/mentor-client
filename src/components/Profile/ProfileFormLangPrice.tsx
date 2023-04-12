import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store';
import { MultiSelect } from 'react-multi-select-component';
import cnBind from 'classnames/bind';
import styles from '../Authorization/registration/registration.module.css';
import stylesForm from './Form.module.css';
import { setUpdatePrice, setUpdateLanguage } from '../../store/slices/UserUpdateSlice';
import { options } from './utils/selectOptions';
import { SelectLanguage } from '../../models';

const cx = cnBind.bind(styles);

const ProfileFormLangPrice = () => {
  const { language, price } = useAppSelector((state) => state.user);
  const [selected, setSelected] = useState<SelectLanguage[]>([]);
  const [focusStylePrice, setFocusPrice] = useState(false);
  const dispatch = useAppDispatch();
  const [priceDollar, setCoastDollar] = useState(false);
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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyValue = event.key;
    const regex = /^[0-9]+$/;

    if (!regex.test(keyValue)) {
      event.preventDefault();
    }
  };

  const handlePrice = (event: ChangeEvent<HTMLInputElement>) => {
    let currency = 'rub';
    if (priceDollar) currency = 'dollar';
    const price = {
      value: event.target.value.toString(),
      currency: currency,
    };
    dispatch(setUpdatePrice(price));
  };
  const togglePrice = () => {
    setCoastDollar(priceDollar ? false : true);
  };

  return (
    <div className={styles.inputs_wrapper}>
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
            [styles.inputError]: errors.price,
            [styles.focusStyle]: focusStylePrice,
          })}
          {...register('price')}
          onKeyDown={handleKeyPress}
          onFocus={() => setFocusPrice(true)}
          onInput={handlePrice}
          placeholder="Стоимость"
        />
        <button type="button" className={stylesForm.price} onClick={togglePrice}>
          {priceDollar ? '$' : '₽'}
        </button>
      </div>
    </div>
  );
};

export default ProfileFormLangPrice;
