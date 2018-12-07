import { ActionType as IActionType } from 'typesafe-actions';
import * as actions from './actions';
import createMiddleware from './createMiddleware';
import ActionType from './ActionType';

type Action = IActionType<typeof actions>;

export { actions, createMiddleware, Action, ActionType };
