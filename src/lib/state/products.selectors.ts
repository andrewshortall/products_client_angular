import { reselect } from '@libs/midgard-angular/src/lib/modules/store';

const getProducts = state => state.productsReducer;

export const getAllProducts = reselect.createSelector(
  getProducts,
  (products) => {
    if (products) {
      products.data.map(product => {
        const random = (Math.random() * 10); // TODO: to get a random picture just for demo and should be removed
        if (random > 5 && product.title !== 'Product Name') {
          product.picture = 'assets/img/product-example.jpeg';
        }
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

