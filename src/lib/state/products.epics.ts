import { HttpService } from '@libs/midgard-angular/src/lib/modules/http/http.service';
import { ofType } from 'redux-observable';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { LOAD_DATA_PRODUCTS, loadProductsDataCommit, loadProductsDataFail } from '@libs/products/src/lib/state/products.actions';

const httpService = new HttpService();

/**
 * @description this is here to handle asynchronous actions and will be triggered when LOAD_DATA_CONTACTS action is dispatched
 * @param {Observable} action$ - the current action
 */
const loadProductsDataEpic = action$ => {
  return action$.pipe(
    ofType(LOAD_DATA_PRODUCTS),
    switchMap((action: any) => {
      return httpService.makeRequest('get', 'https://dev.toladata.io/api/workflowlevel1/').pipe(
        // If successful, dispatch success action with result
        map(res => loadProductsDataCommit(res.data)),
        // If request fails, dispatch failed action
        catchError((error) => of(loadProductsDataFail(error)))
      );
    })
  );
};

// combine the modules epics into one
export const productsEpics  = loadProductsDataEpic;
