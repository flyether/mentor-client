import { ProfileMentee, ProfileMentor } from '../../components/Profile';
import { useAppSelector } from '../../store';

const ProfilePage = () => {
  // const userData: User = useAppSelector((state) => state.user) || null;
  const { role } = useAppSelector((state) => state.authorization);
  console.log(role);
  if (role === 'mentee') return <ProfileMentee />;
  if (role === 'mentor') return <ProfileMentor />;
  return null;
};

export default ProfilePage;
