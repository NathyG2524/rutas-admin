import { configureStore } from '@reduxjs/toolkit';
import { rutasApi } from './rutas.api';


export const store = configureStore({
  reducer: {
    [rutasApi.reducerPath]: rutasApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
        rutasApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
