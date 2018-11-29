import {
  CREATE_PRODUCT_COMMIT, DELETE_PRODUCT_COMMIT, LOAD_ALL_PRODUCTS_COMMIT, LOAD_ONE_PRODUCT_COMMIT,
  UPDATE_PRODUCT_COMMIT
} from '@libs/products/src/lib/state/products.actions';
import { addAll, deleteOne, upsertOne } from '@libs/midgard-angular/src/lib/state/reducer.utils';

const initialState: any = {
  data: [],
  dataLoaded: false
};

export function productsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL_PRODUCTS_COMMIT:
      return addAll(state, action);
    case LOAD_ONE_PRODUCT_COMMIT:
      return upsertOne(state, action);
    case CREATE_PRODUCT_COMMIT:
      return upsertOne(state, action);
    case UPDATE_PRODUCT_COMMIT:
      return upsertOne(state, action);
    case DELETE_PRODUCT_COMMIT:
      return deleteOne(state, action);
    default:
      return state;
  }
}
