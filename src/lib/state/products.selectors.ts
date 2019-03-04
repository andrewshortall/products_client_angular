import { reselect } from '@src/midgard/modules/store';

const getProducts = state => state.productsReducer;

export const getAllProducts = reselect.createSelector(
  getProducts,
  (products) => {
    if (products) {
      products.data.map(product => {
        return product;
      });
      return products;
    }
  }
);

/**
 * selector that selects one product from the products reducer
 * @param {number} id - id of the document
 * @returns {MemoizedSelector<any, any>}
 */
export const selectProduct = (id: number) => reselect.createSelector(getProducts, (products) => {
  return products.data.find( product => product.id.toString() === id.toString());
});

