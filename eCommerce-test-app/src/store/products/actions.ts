import { createAction } from 'redux-actions';
import * as TYPES from './types';

export const getProductEpics = createAction(TYPES.GET_PRODUCT_EPIC);
export const getProductLoading = createAction(TYPES.GET_PRODUCT_LOADING);
export const getProductSuccess = createAction(TYPES.GET_PRODUCT_SUCCESS);
export const getProductError = createAction(TYPES.GET_PRODUCT_ERROR);
