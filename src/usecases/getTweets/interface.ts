import { Tweet } from '@pirosikick/entities';
import { IUseCase, IUseCaseFactory } from '../interface';

export interface IDataAccess {
  findTweetsByUserName(userName: string): Promise<Tweet[]>;
}

export interface IGetTweetsInput {
  userName: string;
}

export interface IGetTweetsOutput {
  tweets: Array<{
    id: string;
    user: {
      id: string;
      name: string;
      createdAt: Date;
    };
    text: string;
    createdAt: Date;
  }>;
}

export type IGetTweets = IUseCase<IGetTweetsInput, IGetTweetsOutput>;

export type IGetTweetsFactory = IUseCaseFactory<IDataAccess, IGetTweets>;
