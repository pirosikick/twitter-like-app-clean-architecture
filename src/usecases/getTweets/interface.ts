import { ITweet } from '@pirosikick/entities';
import { IUseCase, IUseCaseFactory } from '../interface';

export interface IDataAccess {
  findTweetsByUserName(userName: string): Promise<ITweet[]>;
}

export interface IGetTweetsInput {
  userName: string;
}

export interface IGetTweetsOutput {
  tweets: Array<{
    id: string;
    userId: string;
    text: string;
    createdAt: Date;
  }>;
}

export type IGetTweets = IUseCase<IGetTweetsInput, IGetTweetsOutput>;

export type IGetTweetsFactory = IUseCaseFactory<IDataAccess, IGetTweets>;
