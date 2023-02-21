import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { localStorageCartKey } from '../app/services/cart/cartListeners';
import { cartActions, selectCartDataAsArray } from '../app/services/cart/cartSlice';

export default function useGetCart() {
  const data = useSelector(selectCartDataAsArray);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data == null) {
      const json = localStorage.getItem(localStorageCartKey);
      if (json) {
        const dataFromLocalStorage = JSON.parse(json);
        //console.log('useGetCart loaded data from LS =', dataFromLocalStorage);
        if (dataFromLocalStorage) {
          dispatch(cartActions.setCart(dataFromLocalStorage));
        };
      };
    };
  }, [data, dispatch]);

  return data;
};