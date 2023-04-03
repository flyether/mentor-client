import { FC, ReactNode } from 'react';
import cn from 'classnames';

import styles from './style.module.css';

type Props = {
  btnType?: 'action' | 'outlined' | 'secondary';
  size?: 'xl';
  buttonStatus?: 'normal' | 'disabled';
  children?: string | ReactNode;
  type?: 'button' | 'submit';
  onClick?: VoidFunction;
  mb?: string;
};

export const Button: FC<Props> = ({
  btnType = 'action',
  buttonStatus = 'normal',
  children,
  type,
  onClick,
  mb,
  size,
}) => {
  const buttonClassName = cn(
    styles.button,
    styles[`${btnType}`],
    styles[`${buttonStatus}`],
    styles[`${size}`]
  );

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      type={type}
      disabled={buttonStatus === 'disabled'}
      style={{ marginBottom: mb }}
    >
      {children ? children : ''}
    </button>
  );
};
