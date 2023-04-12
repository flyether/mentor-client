import { useAppSelector } from '../../store';
import { Button } from '../atoms/Button/Button';

import styles from './Profile.module.css';
import ProfileFormAbout from './ProfileFormAbout';
import { ProfilePicSignOut } from '.';

export const ProfileMentee = () => {
  const updateUser = useAppSelector((state) => state.updateUser);
  const handleSubmit = () => {
    console.log(updateUser);
  };

  return (
    <div className={styles.container}>
      <ProfilePicSignOut />
      <div className={styles.colum}>
        <ProfileFormAbout />
        <div className={styles.button__submit}>
          <Button onClick={handleSubmit} type="submit">
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
};
