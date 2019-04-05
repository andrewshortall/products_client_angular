import {
  CREATE_PRODUCT_COMMIT, DELETE_PRODUCT_COMMIT, LOAD_ALL_PRODUCTS_COMMIT, LOAD_ONE_PRODUCT_COMMIT,
  UPDATE_PRODUCT_COMMIT
} from '@clients/products/src/lib/state/products.actions';
import { addAll, deleteOne, upsertOne } from '@src/midgard/modules/store/reducer.utils';

const initialState: any = {
  data: [],
  loaded: false,
  created: false,
  updated: false,
  deleted: false
};

export function productsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL_PRODUCTS_COMMIT:
      return addAll(state, action);
    case LOAD_ONE_PRODUCT_COMMIT:
      return upsertOne(state, action, 'uuid', 'results');
    case CREATE_PRODUCT_COMMIT:
      return upsertOne(state, action, 'uuid', 'results');
    case UPDATE_PRODUCT_COMMIT:
      return upsertOne(state, action, 'uuid', 'results');
    case DELETE_PRODUCT_COMMIT:
      return deleteOne(state, action, 'uuid', 'results');
    default:
      return state;
  }
}
