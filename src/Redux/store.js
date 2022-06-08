import { applyMiddleware, createStore } from 'redux';
import { buildType } from '../data';
import logger from 'redux-logger';

import rootReducer from './rootReducer';

const middlewares = [];

switch (buildType) {
	case 'development':
		middlewares.push(logger);
		break;

	default:
		break;
}

export const Store = createStore(rootReducer, applyMiddleware(...middlewares));
