import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { IError } from '../../models';
import { useAppSelector } from '../../store';
import { LoadingScreen } from '../atoms/loading';

import { ServerError } from '../atoms/Modal/ServerError/server-error';

import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { displayError } from './handle-errors';

import styles from './layout.module.css';

export const Layout = () => {
  const [rejectedEndpointName, setRejectedEndpointName] = useState<string | undefined>('undefined');
  const queries = useAppSelector((state) => state.api.queries);
  const mutations = useAppSelector((state) => state.api.mutations);
  const isSomeQueryPending = Object.values(queries).some((query) => query?.status === 'pending');
  const isSomeMutationPending = Object.values(mutations).some(
    (query) => query?.status === 'pending'
  );

  useEffect(() => {
    const rejectedQuery = Object.values(queries).find((query) => query?.status === 'rejected');

    if (rejectedQuery && rejectedQuery.endpointName) {
      // setRejectedEndpointName(displayError(rejectedQuery.endpointName));
      setRejectedEndpointName(rejectedQuery.error?.message);
    } else {
      setRejectedEndpointName(undefined);
    }
  }, [queries]);

  useEffect(() => {
    const rejectedMutation = Object.values(mutations).find(
      (mutation) => mutation?.status === 'rejected'
    );
    // тут по хорошему серилизовать бы кастомную ошибку, но у меня пока не вышло
    const serverError = rejectedMutation?.error as IError;
    if (rejectedMutation && rejectedMutation.endpointName) {
      // setRejectedEndpointName(displayError(rejectedMutation.endpointName));
      setRejectedEndpointName(serverError.data.message);
    } else {
      setRejectedEndpointName(undefined);
    }
  }, [mutations]);

  return (
    <div className={styles.container}>
      {isSomeQueryPending && <LoadingScreen />}
      {isSomeMutationPending && <LoadingScreen />}
      {rejectedEndpointName && (
        <ServerError
          message={rejectedEndpointName}
          close={() => setRejectedEndpointName(undefined)}
        />
      )}
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
