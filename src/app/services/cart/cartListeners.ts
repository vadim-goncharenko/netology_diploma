import { AnyAction, isAnyOf, Unsubscribe } from "@reduxjs/toolkit";
import { AppListenerEffectAPI, AppStartListening } from "../../store";
import { cartActions } from "./cartSlice";

export const localStorageCartKey = 'cart';

export async function saveCartToLocalStorage(_: AnyAction, listenerApi: AppListenerEffectAPI) {
  const { cart } = listenerApi.getState();
  localStorage.setItem(localStorageCartKey, JSON.stringify(cart));
};

export async function orderPosted(_: AnyAction, listenerApi: AppListenerEffectAPI) {
  console.log('orderPosted listener', listenerApi);
};

export function setupCartListeners(
  startListening: AppStartListening
): Unsubscribe {
  const subscriptions = [
    startListening({
      matcher: isAnyOf(cartActions.addToCart, cartActions.deleteFromCart, cartActions.orderPosted),
      effect: saveCartToLocalStorage
    }),
    startListening({
      actionCreator: cartActions.orderPosted,
      effect: orderPosted
    })
  ];

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe())
  }
};
