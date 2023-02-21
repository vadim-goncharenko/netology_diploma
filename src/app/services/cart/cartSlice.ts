import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartData, CartItem, CartItems, CartState, DeleteFromCartPayload, FixMeLater, Order, Owner } from '../../../types/types';

const initialState: CartState = {
  data: null, // data[product][size] = { id, count, price, title, size }
  owner: {
    phone: '',
    address: '',
  }
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { id:productID, title, price, size, count } = action.payload;
      if (state.data == null) {
        state.data = {};
      };
      if (!state.data?.hasOwnProperty(productID)) { // add product for the 1st time
        state.data[productID] = {};
      };
      if (state.data[productID].hasOwnProperty(size) && state.data[productID][size]?.count != null) {
        // increase count
        state.data[productID][size].count += count;
      } else {
        // add product size
        state.data[productID][size] = { id: productID, title, price, size, count };
      };
    },

    setCart: (_, action: PayloadAction<CartState>) => {
      return action.payload;
    },

    deleteFromCart: (state, action: PayloadAction<DeleteFromCartPayload>) => {
      const { id: productID, size } = action.payload;
      if (state.data) {
        delete state.data[productID][size];
        if (Object.keys(state.data[productID]).length === 0) { // no sizes left
          delete state.data[productID];
        };
      };
    },

    setOwnerData: (state, action: PayloadAction<Owner>) => {
      //console.log('setOwnerData', action.payload);
      state.owner = action.payload;
    },

    orderPosted: (state) => {
      console.log('orderPosted action');
      state.data = null;
    },
  }
});

export const selectCartData = (state: FixMeLater) => state.cart.data;

// convert to array
export const convertCartDataToArray = (data: CartData): CartItems => {
  //console.log('convertCartDataToArray data = ', data);
  if (data == null) return null;
  if (Object.keys(data).length === 0) return [];

  return Object.keys(data).flatMap((productID) => (
    //console.log(' productID = ', productID, typeof productID);
    Object.keys(data[Number(productID)]).map(size => (
      data[Number(productID)][size]
    ))));
};

export const selectCountInCart = (state: FixMeLater) => (state.cart.data == null ? null
  : Object.keys(state.cart.data).length === 0 ? 0
  : Object.keys(state.cart.data).reduce( (sum, product) => (sum + Object.keys(state.cart.data[product]).length), 0 ));

export const selectCartDataAsArray = (state: FixMeLater):CartItems => convertCartDataToArray(state.cart.data);

export const selectOwner = (state: any) => state.cart.owner;

export const selectOrder = (state: any):Order => ({
  owner: state.cart.owner,
  items: convertCartDataToArray(state.cart.data)
});

export default cartSlice.reducer;

export const cartActions = cartSlice.actions;