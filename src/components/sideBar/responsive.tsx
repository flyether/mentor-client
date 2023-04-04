import { useLocation, useParams } from 'react-router-dom';

import { SideBar } from '.';

export const Responsive = () => {
  const { category, bookId } = useParams();
  const location = useLocation();

  if (
    location.pathname.includes('/profile') ||
    location.pathname.includes('/ordinary') ||
    location.pathname.includes('/security')
  )
    return <SideBar />;

  return null;
};
