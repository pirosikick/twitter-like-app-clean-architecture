import { Tweet, User } from '@pirosikick/entities';
import { IUseCase, IUseCaseFactory } from '../interface';

export interface IDataAccess {
  findUserById(id: string): Promise<User | null>;
  createTweet(userId: string, text: string): Promise<Tweet>;
}

// ユースケースの入力データ
export interface ICreateTweetInput {
  userId: string;
  text: string;
}

// ユースケースの出力データ
export interface ICreateTweetOutput {
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
}

export type ICreateTweet = IUseCase<ICreateTweetInput, ICreateTweetOutput>;

export type ICreateTweetFactory = IUseCaseFactory<IDataAccess, ICreateTweet>;
