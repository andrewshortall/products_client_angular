export const LOAD_ALL_PRODUCTS = 'LOAD_ALL_PRODUCTS';
export const LOAD_ALL_PRODUCTS_COMMIT = 'LOAD_ALL_PRODUCTS_COMMIT';
export const LOAD_ALL_PRODUCTS_FAIL = 'LOAD_ALL_PRODUCTS_FAIL';

export function loadProductsData() {
  return {
    type: LOAD_ALL_PRODUCTS,
  };
}

export function loadProductsDataCommit(data) {
  return {
    type: LOAD_ALL_PRODUCTS_COMMIT,
    data
  };
}

export function loadProductsDataFail(error) {
  return {
    type: LOAD_ALL_PRODUCTS_FAIL,
    error
  };
}

