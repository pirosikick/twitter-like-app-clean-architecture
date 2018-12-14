import { IRetweet } from '@pirosikick/entities';
import { IUseCase, IUseCaseFactory } from '../interface';

export interface ICreateRetweetInput {
  userId: string;
  tweetId: string;
}

export interface ICreateRetweetOutput {
  retweet: {
    id: string;
    userId: string;
    tweetId: string;
    createdAt: Date;
  };
}

export interface IDataAccess {
  createRetweet: (userId: string, tweetId: string) => Promise<IRetweet>;
}

export type ICreateRetweet = IUseCase<
  ICreateRetweetInput,
  ICreateRetweetOutput
>;

export type ICreateRetweetFactory = IUseCaseFactory<
  IDataAccess,
  ICreateRetweet
>;
