import { Action, actionTypes, LoginState } from '../types/types';

export const authReducer = (state: LoginState, action: Action) => {
  const { login, logout, refresh } = actionTypes;
  const { type, payload } = action;

  switch (type) {
    case login:
      return {
        ...state,
        logged: true,
        user: payload.companyName,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        roles: payload.roles,
      };

    case refresh:
      return {
        ...state,
        logged: true,
        user: payload.companyName,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        roles: payload.roles,
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
