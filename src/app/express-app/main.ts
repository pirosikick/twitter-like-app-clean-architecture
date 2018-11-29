import { createContainer, InjectionMode, asClass, asFunction } from 'awilix';
import express from 'express';
import { MemoryGateway } from 'gateways';
import * as usecases from 'usecases';
import * as controllers from 'controllers';
import * as routers from './routers';
import makeApp from './makeApp';

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

container.register({
  dataAccess: asClass(MemoryGateway),
  tweetUseCase: asClass(usecases.tweet.TweetUseCase),
  retweetUseCase: asClass(usecases.retweet.RetweetUseCase),
  signInUseCase: asClass(usecases.signIn.SignInUseCase),
  signUpUseCase: asClass(usecases.signUp.SignUpUseCase),
  fetchTimelineItemsUseCase: asClass(
    usecases.fetchTimelineItems.FetchTimelineItemsUseCase
  ),
  signInController: asClass(controllers.SignInController),
  signInRouter: asFunction(routers.makeSignInRouter),
  app: asFunction(makeApp)
});

const app = container.resolve<express.Application>('app');
app.listen(process.env.NODE_ENV || 3000);
