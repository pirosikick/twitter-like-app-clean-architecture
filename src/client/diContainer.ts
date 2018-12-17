import {
  createContainer,
  asClass,
  InjectionMode,
  asFunction,
  Lifetime
} from 'awilix';
import * as usecases from '@pirosikick/usecases';
import { MemoryDataAccess } from '@pirosikick/data-access';

const container = createContainer({ injectionMode: InjectionMode.CLASSIC });

container.register({
  dataAccess: asClass(MemoryDataAccess, { lifetime: Lifetime.SINGLETON }),
  signUpWithPassword: asFunction(usecases.signUpWithPassword.factory),
  signInWithPassword: asFunction(usecases.signInWithPassword.factory),
  createUser: asFunction(usecases.createUser.factory),
  createTweet: asFunction(usecases.createTweet.factory),
  getTweets: asFunction(usecases.getTweets.factory)
});

export default container;
