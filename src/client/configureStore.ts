import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

export default function configureStore() {
  const composeEnhancers =
    process.env.NODE_ENV !== 'production'
      ? ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose)
      : compose;
  const enhancers = composeEnhancers(applyMiddleware(thunkMiddleware));

  return createStore(reducer, undefined, enhancers);
}
