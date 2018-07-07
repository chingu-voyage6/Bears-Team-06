import { createActions } from 'redux-actions';
import * as TYPES from './types';

const actionCreators = createActions(
  {
    [TYPES.SIGN_IN]: [({ values }) => values, ({ actions }) => actions],
  },
  TYPES.SIGN_UP,
  TYPES.SIGN_OUT,
);

export const { signIn, signUp, signOut } = actionCreators;
