import { MidgardState } from '@libs/midgard-angular/src/lib/state/midgard.model';
import { LOAD_DATA_PRODUCTS_COMMIT } from '@libs/products/src/lib/state/products.actions';

const initialState: MidgardState = {
  workflowLevel1: [],
  workflowLevel2: [],
  dataLoaded: false
};

export function productsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DATA_PRODUCTS_COMMIT:
      return Object.assign({}, state, {
        workflowLevel1: action.data,
        dataLoaded: true
      });

    default:
      return state;
  }
}
