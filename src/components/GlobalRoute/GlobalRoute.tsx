import { Routes, Route } from 'react-router-dom';

import WelcomePage from '../../pages/WelcomePage';
import ErrorPage from '../../pages/ErrorPage';
import ErrorBoundary from '../../utils/ErrorBoundary';
import LoginPage from '../../pages/LoginPage';
import RegistrationPage from '../../pages/RegistrationPage';
import { Layout } from '../layout';
import EmailConfirmation from '../../pages/EmailСonfirmationPage';
import { Url } from '../../models/constants';
import { ProtectedRoute } from './protected-route';
import { useAppSelector } from '../../store';
import ProfilePage from '../../pages/ProfilePage';
import { ForgotPassword } from '../Authorization/login';
import { OrdinaryPage } from '../../pages/OrdinaryPage';
import { SecurityPage } from '../../pages/SecurityPage';

const GlobalRoute = () => {
  const { authorization } = useAppSelector((state) => state.user);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ErrorBoundary>
            <Layout />
          </ErrorBoundary>
        }
      >
        {/* <Route index={true} element={<Navigate to="/тут есл и переадресация" />} /> */}
        <Route
          path={Url.PATH_PROFILE}
          element={
            <ProtectedRoute authorization={authorization}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path={Url.PATH_ORDINARY}
          element={
            <ProtectedRoute authorization={authorization}>
              <OrdinaryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={Url.PATH_SECURITY}
          element={
            <ProtectedRoute authorization={authorization}>
              <SecurityPage />
            </ProtectedRoute>
          }
        />
        <Route index={true} element={<WelcomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="verify-signup" element={<EmailConfirmation />} />
        <Route path="/forgot-pass" element={<ForgotPassword />} />
        <Route path="*" element={<ErrorPage />} />
        <Route />
      </Route>
    </Routes>
  );
};

export default GlobalRoute;
