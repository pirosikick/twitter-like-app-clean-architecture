import { Action } from 'redux';

export interface IUser {
  readonly id: string;
  readonly name: string;
}

export interface IPayloadAction<T, P> extends Action {
  type: T;
  payload: P;
}
