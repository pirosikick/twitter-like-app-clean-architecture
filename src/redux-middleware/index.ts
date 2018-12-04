import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type Action = ActionType<typeof actions>;

export { default as createMiddleware } from './createMiddleware';
