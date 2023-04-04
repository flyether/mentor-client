import { AuthorizationData, User, RegData, VerificationToken, UserResponse } from '../../models/';
import { Url } from '../../models/constants';

import { setUser } from '../slices/UserSlice';
import { commonApi } from './common.api';

export const AuthorizationUserAPI = commonApi.injectEndpoints({
  endpoints: (build) => ({
    regUser: build.mutation<User, RegData>({
      query: (userInfo) => ({
        url: Url.API_REG,
        method: 'POST',
        body: userInfo,
      }),
    }),
    authorizationUser: build.mutation<UserResponse, AuthorizationData>({
      query: (userInfo) => ({
        url: '/login',
        method: 'POST',
        body: userInfo,
      }),
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUser(result.data));
        } catch (e) {
          console.error('userApi Authorization error', e);
        }
      },
    }),

    verificationTokenPost: build.mutation<User, VerificationToken>({
      query: (token) => ({
        url: '/validate-email',
        method: 'POST',
        body: token,
      }),
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUser(result.data));
        } catch (e) {
          console.error('userApi Authorization error', e);
        }
      },
    }),
  }),
});
