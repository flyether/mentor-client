import { User } from '../../models';
import { useAppSelector } from '../../store';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const userData: User = useAppSelector((state) => state.user) || null;

  return <div className={styles.container}></div>;
};

export default ProfilePage;
