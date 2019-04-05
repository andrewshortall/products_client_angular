import { reselect } from '@src/midgard/modules/store';

const getProducts = state => state.productsReducer;

export const getAllProducts = reselect.createSelector(
  getProducts,
  (products) => {
    if (products) {
      return products;
    }
  }
);

/**
 * selector that selects one product from the products reducer
 * @param {number} uuid - unique id of the document
 * @returns {MemoizedSelector<any, any>}
 */
export const selectProduct = (uuid: number) => reselect.createSelector(getProducts, (products) => {
  return products.data.results.find( product => product.uuid.toString() === uuid);
});

