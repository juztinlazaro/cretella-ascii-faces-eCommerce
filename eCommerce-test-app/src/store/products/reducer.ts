import { handleActions } from 'redux-actions';
import Model from './model';
import { onActionString } from 'common/utils';
import { getProductSuccess, getProductLoading } from './actions';

interface IProductsReducer {
  products?: any[];
  loading?: boolean;
}

interface IPayload {
  payload: object;
}

export default handleActions<IProductsReducer, IPayload>(
  {
    [onActionString(getProductSuccess)]: (state: object, action: any) => ({
      ...state,
      loading: false,
      products: action.payload,
    }),
    [onActionString(getProductLoading)]: (state: object) => ({
      ...state,
      loading: true,
    }),
  },
  Model,
);
