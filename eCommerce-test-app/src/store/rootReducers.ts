import { combineReducers } from 'redux';

import homeReducer from './home/reducer';
import productReducer from './products/reducer';

const rootReducers = combineReducers({
  homes: homeReducer,
  products: productReducer,
} as any);

export default rootReducers;
