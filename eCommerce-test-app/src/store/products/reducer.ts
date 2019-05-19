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
  isNoData?: boolean;
}

interface IPayload {
  payload: object;
}

export default handleActions<IProductsReducer, IPayload>(
  {
    [onActionString(getProductSuccess)]: (
      state: IProductsReducer,
      action: any,
    ) => {
      const products = action.payload;
      const isCheckNoData = products.length === 0;

      return {
        ...state,
        infiniteScrollLoading: false,
        isNoData: isCheckNoData,
        loading: false,
        products: [...state.products, ...products],
      };
    },
    [onActionString(getProductLoading)]: (state: IProductsReducer) => ({
      ...state,
      isNoData: false,
      loading: true,
    }),
    [onActionString(getProductInfiniteScrollLoading)]: (
      state: IProductsReducer,
    ) => ({
      ...state,
      infiniteScrollLoading: true,
      isNoData: false,
    }),
  },
  Model,
);
