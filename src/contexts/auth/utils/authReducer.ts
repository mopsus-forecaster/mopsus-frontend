import { Action, actionTypes, LoginState } from '../types/types';

export const authReducer = (state: LoginState, action: Action) => {
  const { login, logout } = actionTypes;
  const { type, payload } = action;

  switch (type) {
    case login:
      return {
        ...state,
        logged: true,
        user: payload.username,

        accessToken: payload.accessToken,
      };

    case logout:
      return {
        ...state,
        logged: false,
      };

    default:
      return state;
  }
};
