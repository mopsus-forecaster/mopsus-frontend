export type Action = {
  type: string;
  payload?: {
    companyName: string;
    accessToken: string;
    refreshToken?: string;
    roles: string[];
  };
};

export const actionTypes = {
  login: '[Auth] login',
  logout: '[Auth] logout',
  refresh: '[Auth] refresh',
};

export interface LoginState {
  logged: boolean;
  user?: User;
}

type User = {
  id: string;
  name: string;
};
