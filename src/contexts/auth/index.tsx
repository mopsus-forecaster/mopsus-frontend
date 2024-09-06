import { createContext, useReducer } from 'react';
import { authReducer } from './utils/authReducer';
import { Action, actionTypes } from './types/types';

export const AuthContext = createContext(null);

const init = () => {
  const userLocalStorage = sessionStorage.getItem('user');
  if (userLocalStorage) {
    const user = JSON.parse(userLocalStorage);
    return {
      logged: Boolean(user),
      user,
    };
  } else {
    return {
      logged: false,
    };
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, {}, init);

  const login = (username: string, accessToken: string) => {
    const user = {
      username,
      accessToken,
    };
    sessionStorage.setItem('user', JSON.stringify(user));

    const action: Action = {
      type: actionTypes.login,
      payload: {
        username,

        accessToken,
      },
    };
    dispatch(action);
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    dispatch({ type: actionTypes.logout });
  };

  return (
    <AuthContext.Provider value={{ login, logout, auth }}>
      {children}
    </AuthContext.Provider>
  );
};
