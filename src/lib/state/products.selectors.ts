import { reselect } from '@libs/midgard-angular/src/lib/modules/store';

const getProducts = state => state.productsReducer;

export const getAllProducts = reselect.createSelector(
  getProducts,
  (products) => {
    if (products) {
      return products;
    }
  }
);
