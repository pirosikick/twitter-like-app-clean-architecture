import { createContainer, asClass, InjectionMode, asFunction } from 'awilix';
import * as usecases from '@pirosikick/usecases';
import * as app from './app';
import { MemoryDataAccess } from '@pirosikick/data-access';
import { createMiddleware } from '@pirosikick/redux-middleware';
import Client from './Client';
import configureStore from './configureStore';

const container = createContainer({ injectionMode: InjectionMode.CLASSIC });
container.register({
  dataAccess: asClass(MemoryDataAccess),
  tweetUseCase: asClass(usecases.tweet.UseCase),
  retweetUseCase: asClass(usecases.retweet.UseCase),
  createUserUseCase: asClass(usecases.createUser.UseCase),
  readTimelineUseCase: asClass(usecases.readTimeline.UseCase),
  useCaseMiddleware: asFunction(createMiddleware),
  store: asFunction(configureStore),
  client: asClass(Client)
});

const client = container.resolve<Client>('client');
const createUserUseCase = container.resolve<usecases.createUser.UseCase>(
  'createUserUseCase'
);
createUserUseCase.createUser({ userName: 'pirosikick' }).then(output => {
  client.dispatchAction(
    app.actions.setUser({ id: output.user.id, name: output.user.name })
  );
  client.renderTo(document.getElementById('app') as Element);
});
