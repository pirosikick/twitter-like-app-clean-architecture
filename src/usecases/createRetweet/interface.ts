import { Retweet } from '@pirosikick/entities';
import { IUseCase, IUseCaseFactory } from '../interface';

export interface ICreateRetweetInput {
  userId: string;
  tweetId: string;
}

export interface ICreateRetweetOutput {
  retweet: {
    id: string;
    user: {
      id: string;
      name: string;
      createdAt: Date;
    };
    tweet: {
      id: string;
      user: {
        id: string;
        name: string;
        createdAt: Date;
      };
      text: string;
      createdAt: Date;
    };
    createdAt: Date;
  };
}

export interface IDataAccess {
  createRetweet: (userId: string, tweetId: string) => Promise<Retweet>;
}

export type ICreateRetweet = IUseCase<
  ICreateRetweetInput,
  ICreateRetweetOutput
>;

export type ICreateRetweetFactory = IUseCaseFactory<
  IDataAccess,
  ICreateRetweet
>;
