import { HttpService } from 'src/midgard/modules/http/http.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  createProductCommit, createProductFail, deleteProductCommit, deleteProductFail,
  LOAD_ALL_PRODUCTS, loadOneProductFail, loadProductsCommit,
  updateProductCommit, updateProductFail, loadProductsFail, CREATE_PRODUCT,
  DELETE_PRODUCT, LOAD_ONE_PRODUCT, loadOneProductCommit,
  UPDATE_PRODUCT
} from './products.actions';
import { environment } from '@env/environment';
import { reduxObservable } from '@src/midgard/modules/store';
import { Action } from '@src/midgard/state/action.type';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductsEpics {
  /**
   * this is here to handle asynchronous actions and will be triggered when LOAD_ALL_PRODUCTS action is dispatched
   * @param {Observable} action$ - the current action
   */
  loadAllProductsEpic = action$ => {
    return action$.pipe(
      reduxObservable.ofType(LOAD_ALL_PRODUCTS),
      switchMap(() => {
        return this.httpService.makeRequest('get', `${environment.API_URL}/products/products`, {}, true).pipe(
          // If successful, dispatch success action with result
          map(res => loadProductsCommit(res.data)),
          // If request fails, dispatch failed action
          catchError(error => of(loadProductsFail(error)))
        );
      })
    );
  }
  /**
   * this is here to handle asynchronous actions and will be triggered when LOAD_ONE_PRODUCT action is dispatched
   * @param {Observable} action$ - the current action
   */
  loadOneProductEpic = action$ => {
    return action$.pipe(
      reduxObservable.ofType(LOAD_ONE_PRODUCT),
      switchMap((action: Action) => {
        return this.httpService.makeRequest('get', `${environment.API_URL}/products/products/${action.products_uuid}/`, {}, true).pipe(
          // If successful, dispatch success action with result
          map((res: Action) => loadOneProductCommit(res.data)),
          // If request fails, dispatch failed action
          catchError((error) => of(loadOneProductFail(error)))
        );
      })
    );
  }

  /**
   * this is here to handle asynchronous actions and will be triggered when CREATE_PRODUCT action is dispatched
   * @param {Observable} action$ - the current action
   */
  createProductEpic = action$ => {
    return action$.pipe(
      reduxObservable.ofType(CREATE_PRODUCT),
      switchMap((action: Action) => {
        return this.httpService.makeRequest('post', `${environment.API_URL}/products/products/`, action.data, true).pipe(
          // If successful, dispatch success action with result
          map((res: Action) => createProductCommit(res.data, action.index)),
          // If request fails, dispatch failed action
          catchError((error) => of(createProductFail(error)))
        );
      })
    );
  }

  /**
   * this is here to handle asynchronous actions and will be triggered when UPDATE_PRODUCT action is dispatched
   * @param {Observable} action$ - the current action
   */
  updateProductEpic = action$ => {
    return action$.pipe(
      reduxObservable.ofType(UPDATE_PRODUCT),
      switchMap((action: Action) => {
        const payload = {...action.data};
        delete payload['id']; // remove id from payload because we already send it in the url
        return this.httpService.makeRequest('put', `${environment.API_URL}/products/products/${action.data.id}/`, payload, true).pipe(
          // If successful, dispatch success action with result
          map((res: Action) => updateProductCommit(res.data, action.nested)),
          // If request fails, dispatch failed action
          catchError((error) => of(updateProductFail(error)))
        );
      })
    );
  }

  /**
   * this is here to handle asynchronous actions and will be triggered when DELETE_PRODUCT action is dispatched
   * @param {Observable} action$ - the current action
   */
  deleteProductEpic = action$ => {
    return action$.pipe(
      reduxObservable.ofType(DELETE_PRODUCT),
      switchMap((action: Action) => {
        return this.httpService.makeRequest('delete', `${environment.API_URL}/products/products/${action.data.id}/`, {}, true).pipe(
          // If successful, dispatch success action with result
          map(res => deleteProductCommit(action.data, action.nested)),
          // If request fails, dispatch failed action
          catchError((error) => of(deleteProductFail(error)))
        );
      })
    );
  }

  constructor(
    private httpService: HttpService
  ) {
    return reduxObservable.combineEpics(
      this.loadAllProductsEpic,
      this.loadOneProductEpic,
      this.updateProductEpic,
      this.deleteProductEpic,
      this.createProductEpic
    );
  }
}
