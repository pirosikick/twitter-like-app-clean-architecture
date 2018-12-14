import { User } from '@pirosikick/entities';
import { IUseCase, IUseCaseFactory } from '../interface';

export interface IDataAccess {
  findUserByName(name: string): Promise<User | null>;
  createUser(name: string): Promise<User>;
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
