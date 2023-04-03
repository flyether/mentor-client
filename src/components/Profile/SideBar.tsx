import { Link, useLocation } from 'react-router-dom';
import { Url } from '../../models/constants';
import styles from './ProfileSideBar.module.css';

const SideBar = () => {
  const location = useLocation();

  if (location.pathname.includes('/profile')) {
    return (
      <div className={styles.container}>
        <Link to={Url.PATH_PROFILE}>Профиль</Link>
      </div>
    );
  }
  return null;
};
export default SideBar;
