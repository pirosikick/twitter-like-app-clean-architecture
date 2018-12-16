import { IUser } from '@pirosikick/entities';
import { IUseCase, IUseCaseFactory } from '../interface';

export interface IDataAccess {
  findUserByName(userName: string): Promise<IUser | null>;
  createUserWithPassword(userName: string, password: string): Promise<IUser>;
}

export interface ISignUpWithPasswordInput {
  userName: string;
  password: string;
}

export enum ErrorCode {
  USERNAME_ALREADY_USED = 'USERNAME_ALREADY_USED',
  USERNAME_INVALID = 'USERNAME_INVALID',
  PASSWORD_INVALID = 'PASSWORD_INVALID'
}

export type ISignUpWithPasswordOutput =
  | {
      succeeded: true;
      user: {
        id: string;
        name: string;
        createdAt: Date;
      };
    }
  | {
      succeeded: false;
      code: ErrorCode;
    };

export type ISignUpWithPassword = IUseCase<
  ISignUpWithPasswordInput,
  ISignUpWithPasswordOutput
>;

export type ISignUpWithPasswordFactory = IUseCaseFactory<
  IDataAccess,
  ISignUpWithPassword
>;
