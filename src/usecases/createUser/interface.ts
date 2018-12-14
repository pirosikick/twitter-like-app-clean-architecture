import { IUser } from '@pirosikick/entities';
import { IUseCase, IUseCaseFactory } from '../interface';

export interface IDataAccess {
  findUserByName(name: string): Promise<IUser | null>;
  createUser(name: string): Promise<IUser>;
}

export interface ICreateUserInput {
  userName: string;
}

export interface ICreateUserOutput {
  user: {
    id: string;
    name: string;
    createdAt: Date;
  };
}

export type ICreateUser = IUseCase<ICreateUserInput, ICreateUserOutput>;

export type ICreateUserFactory = IUseCaseFactory<IDataAccess, ICreateUser>;
