import { LOAD_DATA_PRODUCTS_COMMIT } from '@libs/products/src/lib/state/products.actions';

const initialState: any = {
  products: [],
  dataLoaded: false
};

export function productsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DATA_PRODUCTS_COMMIT:
      return Object.assign({}, state, {
        products: action.data,
        dataLoaded: true
      });

    default:
      return state;
  }
}
