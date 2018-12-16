import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  createContainer,
  asClass,
  InjectionMode,
  asFunction,
  Lifetime
} from 'awilix';
import * as usecases from '@pirosikick/usecases';
import * as app from './app';
import { inject as injectUseCaseInstances } from './usecases';
import { MemoryDataAccess } from '@pirosikick/data-access';
import configureStore from './configureStore';
import Root from './Root';

const container = createContainer({ injectionMode: InjectionMode.CLASSIC });

container.register({
  dataAccess: asClass(MemoryDataAccess, { lifetime: Lifetime.SINGLETON }),
  createUser: asFunction(usecases.createUser.factory),
  createTweet: asFunction(usecases.createTweet.factory),
  getTweets: asFunction(usecases.getTweets.factory),
  store: asFunction(configureStore)
});

injectUseCaseInstances({
  createUser: container.resolve<usecases.createUser.ICreateUser>('createUser'),
  createTweet: container.resolve<usecases.createTweet.ICreateTweet>(
    'createTweet'
  ),
  getTweets: container.resolve<usecases.getTweets.IGetTweets>('getTweets')
});

const createUser = container.resolve<usecases.createUser.ICreateUser>(
  'createUser'
);

createUser({ userName: 'pirosikick' }).then(output => {
  const store = configureStore();
  store.dispatch(
    app.actions.setUser({ id: output.user.id, name: output.user.name })
  );
  ReactDOM.render(<Root store={store} />, document.getElementById(
    'app'
  ) as Element);
});
