import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import { commonApi } from './services/common.api';
import userSlice from './slices/UserSlice';
import regSlice from './slices/RegSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [commonApi.reducerPath]: commonApi.reducer,
    user: userSlice,
    registration: regSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(commonApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
