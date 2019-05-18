import { handleActions } from 'redux-actions';
import Model from './model';
import { onActionString } from 'common/utils';
import {
  getProductSuccess,
  getProductLoading,
  getProductInfiniteScrollLoading,
} from './actions';

interface IProductsReducer {
  products?: any[];
  loading?: boolean;
  infiniteScrollLoading?: boolean;
}

interface IPayload {
  payload: object;
}

export default handleActions<IProductsReducer, IPayload>(
  {
    [onActionString(getProductSuccess)]: (
      state: IProductsReducer,
      action: any,
    ) => ({
      ...state,
      infiniteScrollLoading: false,
      loading: false,
      products: [...state.products, ...action.payload],
    }),
    [onActionString(getProductLoading)]: (state: IProductsReducer) => ({
      ...state,
      loading: true,
    }),
    [onActionString(getProductInfiniteScrollLoading)]: (
      state: IProductsReducer,
    ) => ({
      ...state,
      infiniteScrollLoading: true,
    }),
  },
  Model,
);
