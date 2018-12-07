import { applyMiddleware, compose, createStore } from 'redux';
import {
  middleware as routerMiddleware,
  enhancer as routerEnhancer
} from './router';
import reducer from './reducer';

export default function configureStore() {
  const composeEnhancers =
    process.env.NODE_ENV !== 'production'
      ? ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose)
      : compose;

  const enhancers = composeEnhancers(
    routerEnhancer,
    applyMiddleware(routerMiddleware)
  );
  return createStore(reducer, undefined, enhancers);
}
