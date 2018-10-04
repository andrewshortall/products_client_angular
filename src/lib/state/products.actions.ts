export const LOAD_DATA_PRODUCTS = 'LOAD_DATA_PRODUCTS';
export const LOAD_DATA_PRODUCTS_COMMIT = 'LOAD_DATA_PRODUCTS_COMMIT';
export const LOAD_DATA_PRODUCTS_FAIL = 'LOAD_DATA_PRODUCTS_FAIL';

export function loadProductsData() {
  return {
    type: LOAD_DATA_PRODUCTS,
  };
}

export function loadProductsDataCommit(data) {
  return {
    type: LOAD_DATA_PRODUCTS_COMMIT,
    data
  };
}

export function loadProductsDataFail(error) {
  return {
    type: LOAD_DATA_PRODUCTS_FAIL,
    error
  };
}

