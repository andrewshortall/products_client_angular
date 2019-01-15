// Load All
export const LOAD_ALL_PRODUCTS = 'LOAD_ALL_PRODUCTS';
export const LOAD_ALL_PRODUCTS_COMMIT = 'LOAD_ALL_PRODUCTS_COMMIT';
export const LOAD_ALL_PRODUCTS_FAIL = 'LOAD_ALL_PRODUCTS_FAIL';

// Load One
export const LOAD_ONE_PRODUCT = 'LOAD_ONE_PRODUCT';
export const LOAD_ONE_PRODUCT_COMMIT = 'LOAD_ONE_PRODUCT_COMMIT';
export const LOAD_ONE_PRODUCT_FAIL = 'LOAD_ONE_PRODUCT_FAIL';

// Create
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const CREATE_PRODUCT_COMMIT = 'CREATE_PRODUCT_COMMIT';
export const CREATE_PRODUCT_FAIL = 'CREATE_PRODUCT_FAIL';

// Update
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const UPDATE_PRODUCT_COMMIT = 'UPDATE_PRODUCT_COMMIT';
export const UPDATE_PRODUCT_FAIL = 'UPDATE_PRODUCT_FAIL';

// Delete
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const DELETE_PRODUCT_COMMIT = 'DELETE_PRODUCT_COMMIT';
export const DELETE_PRODUCT_FAIL = 'DELETE_PRODUCT_FAIL';


export function loadProducts() {
  return {
    type: LOAD_ALL_PRODUCTS,
  };
}

export function loadProductsCommit(data) {
  return {
    type: LOAD_ALL_PRODUCTS_COMMIT,
    data
  };
}

export function loadProductsFail(error) {
  return {
    type: LOAD_ALL_PRODUCTS_FAIL,
    error
  };
}

export function loadOneProduct(id: string) {
  return {
    type: LOAD_ONE_PRODUCT,
    id
  };
}

export function loadOneProductCommit(data) {
  return {
    type: LOAD_ONE_PRODUCT_COMMIT,
    data
  };
}

export function loadOneProductFail(error) {
  return {
    type: LOAD_ONE_PRODUCT_FAIL,
    error
  };
}

export function createProduct(data) {
  return {
    type: CREATE_PRODUCT,
    data,
  };
}

export function createProductCommit(data, index?: number) {
  return {
    type: CREATE_PRODUCT_COMMIT,
    data,
    index
  };
}

export function createProductFail(error) {
  return {
    type: CREATE_PRODUCT_FAIL,
    error
  };
}

export function updateProduct(data) {
  return {
    type: UPDATE_PRODUCT,
    data
  };
}

export function updateProductCommit(data, nested) {
  return {
    type: UPDATE_PRODUCT_COMMIT,
    data,
    nested
  };
}

export function updateProductFail(error) {
  return {
    type: UPDATE_PRODUCT_FAIL,
    error
  };
}

export function deleteProduct(id) {
  return {
    type: DELETE_PRODUCT,
    id
  };
}

export function deleteProductCommit(data, nested) {
  return {
    type: DELETE_PRODUCT_COMMIT,
    data,
    nested
  };
}

export function deleteProductFail(error) {
  return {
    type: DELETE_PRODUCT_FAIL,
    error
  };
}

