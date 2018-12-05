import { HttpService } from '@libs/midgard-angular/src/lib/modules/http/http.service';
import { ofType } from 'redux-observable';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  createProductCommit, createProductFail, deleteProductCommit, deleteProductFail,
  LOAD_ALL_PRODUCTS, loadOneProductFail, loadProductsCommit,
  updateProductCommit, updateProductFail, loadProductsFail
} from '@libs/products/src/lib/state/products.actions';
import { environment } from '@env/environment';
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT, LOAD_ONE_PRODUCT, loadOneProductCommit,
  UPDATE_PRODUCT
} from '@libs/products/src/lib/state/products.actions';
import { reduxObservable } from '@libs/midgard-angular/src/lib/modules/store';
import { Action } from '@libs/midgard-angular/src/lib/state/action.type';

const httpService = new HttpService();

/**
 * this is here to handle asynchronous actions and will be triggered when LOAD_DATA_PRODUCTS action is dispatched
 * @param {Observable} action$ - the current action
 */
const loadAllProductsEpic = action$ => {
  return action$.pipe(
    ofType(LOAD_ALL_PRODUCTS),
    switchMap((action: any) => {
      return httpService.makeRequest('get', `${environment.API_URL}/products/products`, {}, true).pipe(
        // If successful, dispatch success action with result
        map(res => loadProductsCommit(res.data)),
        // If request fails, dispatch failed action
        catchError((error) => of(loadProductsFail(error)))
      );
    })
  );
};

/**
 * this is here to handle asynchronous actions and will be triggered when LOAD_ONE_PRODUCT action is dispatched
 * @param {Observable} action$ - the current action
 */
const loadOneProductEpic = action$ => {
  return action$.pipe(
    reduxObservable.ofType(LOAD_ONE_PRODUCT),
    switchMap((action: Action) => {
      return httpService.makeRequest('get', `${environment.API_URL}/products/products/${action.id}/`, true).pipe(
        // If successful, dispatch success action with result
        map((res: Action) => loadOneProductCommit(res.data)),
        // If request fails, dispatch failed action
        catchError((error) => of(loadOneProductFail(error)))
      );
    })
  );
};

/**
 * this is here to handle asynchronous actions and will be triggered when CREATE_PRODUCT action is dispatched
 * @param {Observable} action$ - the current action
 */
const createProductEpic = action$ => {
  return action$.pipe(
    reduxObservable.ofType(CREATE_PRODUCT),
    switchMap((action: Action) => {
      return httpService.makeRequest('post', `${environment.API_URL}/products/products/`, action.data, true).pipe(
        // If successful, dispatch success action with result
        map((res: Action) => createProductCommit(res.data, action.nested)),
        // If request fails, dispatch failed action
        catchError((error) => of(createProductFail(error)))
      );
    })
  );
};

/**
 * this is here to handle asynchronous actions and will be triggered when UPDATE_PRODUCT action is dispatched
 * @param {Observable} action$ - the current action
 */
const updateProductEpic = action$ => {
  return action$.pipe(
    reduxObservable.ofType(UPDATE_PRODUCT),
    switchMap((action: Action) => {
      return httpService.makeRequest('put', `${environment.API_URL}/products/products/${action.data.id}/`, action.data, true).pipe(
        // If successful, dispatch success action with result
        map((res: Action) => updateProductCommit(res.data, action.nested)),
        // If request fails, dispatch failed action
        catchError((error) => of(updateProductFail(error)))
      );
    })
  );
};

/**
 * this is here to handle asynchronous actions and will be triggered when DELETE_PRODUCT action is dispatched
 * @param {Observable} action$ - the current action
 */
const deleteProductEpic = action$ => {
  return action$.pipe(
    reduxObservable.ofType(DELETE_PRODUCT),
    switchMap((action: Action) => {
      return httpService.makeRequest('delete', `${environment.API_URL}/products/products/${action.data.id}/`, true).pipe(
        // If successful, dispatch success action with result
        map(res => deleteProductCommit(action.data, action.nested)),
        // If request fails, dispatch failed action
        catchError((error) => of(deleteProductFail(error)))
      );
    })
  );
};
// combine the modules epics into one
export const productsEpics = reduxObservable.combineEpics(
  loadAllProductsEpic,
  loadOneProductEpic,
  updateProductEpic,
  deleteProductEpic,
  createProductEpic,
);
