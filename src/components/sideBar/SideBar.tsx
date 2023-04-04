import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Url } from '../../models/constants';
import cnBind from 'classnames/bind';
import styles from './ProfileSideBar.module.css';

const cx = cnBind.bind(styles);

export const SideBar = () => {
  const location = useLocation();
  const [isProfile, setProfile] = useState(false);
  const [isSecurity, setSecurity] = useState(false);
  const [isOrdinary, setOrdinary] = useState(false);

  useEffect(() => {
    if (location.pathname.includes('/profile')) {
      setProfile(true);
      setOrdinary(false);
      setSecurity(false);
    }
    if (location.pathname.includes('/security')) {
      setSecurity(true);
      setProfile(false);
      setOrdinary(false);
    }
    if (location.pathname.includes('/ordinary')) {
      setOrdinary(true);
      setProfile(false);
      setSecurity(false);
    }
  }, [location.pathname]);

  return (
    <div className={styles.container}>
      <div className={styles.settings}>Настройки</div>
      <div
        className={cx({
          [styles.link__active]: isProfile,
          [styles.link]: !isProfile,
        })}
      >
        <Link to={Url.PATH_PROFILE}>Профиль</Link>
      </div>
      <div
        className={cx({
          [styles.link__active]: isOrdinary,
          [styles.link]: !isOrdinary,
        })}
      >
        <Link to={Url.PATH_ORDINARY}>Расписание</Link>
      </div>
      <div
        className={cx({
          [styles.link__active]: isSecurity,
          [styles.link]: !isSecurity,
        })}
      >
        <Link to={Url.PATH_SECURITY}>Безопасность</Link>
      </div>
    </div>
  );
};
