import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { PRODUCT_API } from 'common/end-points/api';
import {
  switchMap,
  takeUntil,
  map,
  startWith,
  catchError,
} from 'rxjs/operators';
import { of } from 'rxjs';
import * as TYPES from './types';
import {
  getProductSuccess,
  getProductInfiniteScrollLoading,
  getProductLoading,
  getProductError,
} from './actions';

interface IGetProductAction {
  payload: {
    page?: number;
    limit?: number;
    sort?: string;
    infiniteScrollLoading?: boolean;
  };
}

export const getProductEpic = (action$: any) => {
  return action$.pipe(
    ofType(TYPES.GET_PRODUCT_EPIC),
    switchMap((action: IGetProductAction) => {
      const {
        page = 10,
        limit = 15,
        sort = '',
        infiniteScrollLoading,
      } = action.payload;

      const URL = `${PRODUCT_API}?_page=${page}&_limit=${limit}&_sort=${sort}`;
      return ajax(URL).pipe(
        map(result => getProductSuccess(result.response)),
        takeUntil(action$.pipe(ofType(TYPES.GET_PRODUCT_CANCEL))),
        catchError(error => of(getProductError(error))),
        startWith(
          infiniteScrollLoading
            ? getProductInfiniteScrollLoading()
            : getProductLoading(),
        ),
      );
    }),
  );
};
