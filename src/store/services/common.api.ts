import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { Url } from '../../models/constants';

import { IError } from '../../models/interfaces';

export const commonApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: Url.BASE_URL,

    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    IError,
    Record<string, unknown>,
    FetchBaseQueryMeta
  >,

  tagTypes: ['Mentor', 'Menty', 'User'],
  endpoints: (_) => ({}),
});
