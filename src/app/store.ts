import { configureStore, createListenerMiddleware, ListenerEffectAPI, TypedStartListening } from '@reduxjs/toolkit';
import catalogReducer from './services/catalog/catalogSlice';
import cartReducer from './services/cart/cartSlice';
import { shopApi } from './services/shopApi';

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    cart: cartReducer,
    [shopApi.reducerPath]: shopApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .prepend(listenerMiddleware.middleware)
    .prepend(shopApi.middleware),
  devTools: process.env.NODE_ENV !== 'production'
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export type AppListenerEffectAPI = ListenerEffectAPI<RootState, AppDispatch>;
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export const startAppListening = listenerMiddleware.startListening as AppStartListening;