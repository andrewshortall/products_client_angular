import { LOAD_ALL_PRODUCTS_COMMIT } from '@libs/products/src/lib/state/products.actions';
import { addAll } from '@libs/midgard-angular/src/lib/state/reducer.utils';

const initialState: any = {
  products: [],
  dataLoaded: false
};

export function productsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL_PRODUCTS_COMMIT:
      return addAll(state, action);
    default:
      return state;
  }
}
