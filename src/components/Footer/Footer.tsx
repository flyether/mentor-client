import { Link } from 'react-router-dom';

import styles from './styles.module.css';
import logo from '../../assets/svg/logo.svg';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__links}>
        <Link to="/" className={styles.footer__link}>
          Поддержка
        </Link>
        <Link to="/" className={styles.footer__link}>
          Ссылка 1
        </Link>
        <Link to="/" className={styles.footer__link}>
          Ссылка 2
        </Link>
        <Link to="/" className={styles.footer__link}>
          Ссылка 3
        </Link>
        <Link to="/" className={styles.footer__link}>
          Ссылка 4
        </Link>
        <Link to="/" className={styles.footer__link}>
          Ссылка 5
        </Link>
      </div>
      <Link to="/">
        <img src={logo} />
      </Link>
    </footer>
  );
};
