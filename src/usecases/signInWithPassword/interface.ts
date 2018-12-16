import { IUseCase, IUseCaseFactory } from '../interface';
import { IUser } from '@pirosikick/entities';

export interface IDataAccess {
  verifyPassword(userName: string, password: string): Promise<IUser | null>;
}

export interface ISignInWithPasswordInput {
  userName: string;
  password: string;
}

export type ISignInWithPasswordOutput =
  | {
      succeeded: false;
      user: null;
    }
  | {
      succeeded: true;
      user: {
        id: string;
        name: string;
        createdAt: Date;
      };
    };

export type ISignInWithPassword = IUseCase<
  ISignInWithPasswordInput,
  ISignInWithPasswordOutput
>;

export type ISignInWithPasswordFactory = IUseCaseFactory<
  IDataAccess,
  ISignInWithPassword
>;
