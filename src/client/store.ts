import { combineReducers } from 'redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as usecases from '@pirosikick/usecases';
import { IRootState, IStore, IThunkExtraArgument } from './types';
import * as app from './app';
import * as signUp from './signUp';
import * as signIn from './signIn';

const reducer = combineReducers<IRootState>({
  app: app.reducer,
  signUp: signUp.reducer,
  signIn: signIn.reducer
});

export function configureStore(
  signUpWithPassword: usecases.signUpWithPassword.ISignUpWithPassword,
  signInWithPassword: usecases.signInWithPassword.ISignInWithPassword,
  getTweets: usecases.getTweets.IGetTweets,
  createTweet: usecases.createTweet.ICreateTweet
): IStore {
  const composeEnhancers =
    process.env.NODE_ENV !== 'production'
      ? ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose)
      : compose;

  const enhancers = composeEnhancers(
    applyMiddleware(
      thunkMiddleware.withExtraArgument<IThunkExtraArgument>({
        usecases: {
          signUpWithPassword,
          signInWithPassword,
          getTweets,
          createTweet
        }
      })
    )
  );

  return createStore(reducer, undefined, enhancers);
}
