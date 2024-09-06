export type Action = {
  type: string;
  payload?: {
    username: string;
    accessToken: string;
  };
};

export const actionTypes = {
  login: '[Auth] login',
  logout: '[Auth] logout',
};

export interface LoginState {
  logged: boolean;
  user?: User;
}

type User = {
  id: string;
  name: string;
};
