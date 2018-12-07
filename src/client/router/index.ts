import { connectRoutes, RoutesMap } from 'redux-first-router';
import pageReducer from './pageReducer';
import ActionType from './ActionType';

const routesMap: RoutesMap<ActionType> = {
  [ActionType.HOME]: '/',
  [ActionType.TIMELINE]: '/:userName'
};
const { reducer: locationReducer, middleware, enhancer, thunk } = connectRoutes(
  routesMap
);

export { locationReducer, middleware, enhancer, thunk, pageReducer };
