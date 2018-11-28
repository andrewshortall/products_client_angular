import { redux } from 'midgard-core';

const getProducts = state => state.productsReducer;

export const getAllProducts = redux.createSelector(
  getProducts,
  (products) => {
    if (products) {
      return products.data;
    }
  }
);
