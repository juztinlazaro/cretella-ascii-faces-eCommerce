import { combineEpics } from 'redux-observable';
import { getHomeDataEpic } from './home/epics';
import { getProductEpic } from './products/epics';

const rootEpic = combineEpics<any>(getHomeDataEpic, getProductEpic);

export default rootEpic;
