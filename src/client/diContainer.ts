import {
  createContainer,
  asClass,
  InjectionMode,
  asFunction,
  Lifetime
} from 'awilix';
import * as usecases from '@pirosikick/usecases';
import { MemoryDataAccess } from '@pirosikick/data-access';
import { configureStore } from './store';

const container = createContainer({ injectionMode: InjectionMode.CLASSIC });

container.register({
  dataAccess: asClass(MemoryDataAccess, { lifetime: Lifetime.SINGLETON }),
  signUpWithPassword: asFunction(usecases.signUpWithPassword.factory),
  signInWithPassword: asFunction(usecases.signInWithPassword.factory),
  createUser: asFunction(usecases.createUser.factory),
  createTweet: asFunction(usecases.createTweet.factory),
  getTweets: asFunction(usecases.getTweets.factory),
  store: asFunction(configureStore, { lifetime: Lifetime.SINGLETON })
});

export default container;
