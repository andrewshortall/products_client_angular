import { reselect } from '@src/midgard/modules/store';

const getProducts = state => state.productsReducer;

/**
 * selector to get list of products
 */
export const getAllProducts = reselect.createSelector(
  getProducts,
  (products) => {
    if (products) {
      return products.data.results;
    }
  }
);

/**
 * selector to check if the data is loaded
 */
export const getProductsLoaded = reselect.createSelector(
  getProducts,
  (products) => {
    if (products) {
      return products.loaded;
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

