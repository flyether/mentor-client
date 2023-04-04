import ProfileMentor from '../../components/Profile/ProfileMentor';
import { User } from '../../models';
import { useAppSelector } from '../../store';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  // const userData: User = useAppSelector((state) => state.user) || null;
  const { role } = useAppSelector((state) => state.user);
  console.log(role);
  if (role === 'mentee') return <div className={styles.container}>менти</div>;
  if (role === 'mentor') return <ProfileMentor />;
  return null;
};

export default ProfilePage;
