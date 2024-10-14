import { createContext, useReducer, useState, useEffect } from 'react';
import { authReducer } from './utils/authReducer';
import { Action, actionTypes } from './types/types';
import Cookies from 'js-cookie';
import { refreshUser } from '../../services';
import { FakeNav } from '../../shared/fakeNav/FakeNav';

export const AuthContext = createContext(null);

const getUser = async (cookieRefreshToken: string) => {
  try {
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      name: companyName,
    } = await refreshUser(cookieRefreshToken);

    return {
      accessToken,
      refreshToken,
      companyName,
    };
  } catch (error) {
    return null;
  }
};

// Estado inicial, se puede inicializar vacío
const init = () => {
  return {
    logged: false,
    user: null,
  };
};

export const AuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, {}, init);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [comesFrom, setComesFrom] = useState('');
  const [currentMfaFlow, setCurrentMfaFlow] = useState('');
  const [recoverEmail, setRecoverEmail] = useState('');
  const [recoverPassword, setRecoverPassword] = useState('');
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [prevRoute, setPrevRoute] = useState('');

  const refreshToken = Cookies.get('refreshToken');

  // Cargar el usuario de forma asíncrona al montar el componente
  useEffect(() => {
    const fetchUser = async () => {
      if (!auth.logged && refreshToken) {
        // Verificar si el usuario ya está autenticado
        const user = await getUser(refreshToken);
        if (user) {
          dispatch({
            type: actionTypes.login,
            payload: user,
          });
        } else {
          dispatch({ type: actionTypes.logout });
        }
      }
      setLoading(false); // Se completa la carga
    };

    fetchUser();
  }, [refreshToken, auth.logged]); // Se ejecuta solo cuando el token cambia o cuando el estado logged cambia

  const login = (
    companyName: string,
    accessToken: string,
    refreshToken: string
  ) => {
    Cookies.set('refreshToken', refreshToken, {
      secure: false,
      sameSite: 'Strict',
    });
    Cookies.set('accessToken', accessToken,{
      secure: false,
      sameSite: 'Strict',
    })
    const action: Action = {
      type: actionTypes.login,
      payload: {
        companyName,
        accessToken,
        refreshToken,
      },
    };
    dispatch(action);
  };

  const logout = () => {
    Cookies.remove('refreshToken');
    Cookies.remove('accessToken');
    dispatch({ type: actionTypes.logout });
  };

  const refresh = (accessToken: string, companyName: string) => {
    dispatch({
      type: actionTypes.refresh,
      payload: { accessToken, companyName },
    });
  };

  const handleSetRecoverEmail = (email: string) => {
    setRecoverEmail(email);
  };

  const handleSetRegisterData = (email: string, name: string) => {
    setRegisterData((prevRegisterData) => ({
      ...prevRegisterData,
      name,
      email,
    }));
  };

  const handlesetPrevRoute = (route: string) => {
    setPrevRoute(route);
  };

  if (loading) {
    return <FakeNav />;
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        auth,
        handleSetRecoverEmail,
        recoverEmail,
        handlesetPrevRoute,
        prevRoute,
        comesFrom,
        setComesFrom,
        refresh,
        registerData,
        handleSetRegisterData,
        currentMfaFlow,
        setCurrentMfaFlow,
        recoverPassword,
        setRecoverPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
