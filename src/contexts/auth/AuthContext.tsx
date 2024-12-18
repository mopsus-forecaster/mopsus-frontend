import {
  createContext,
  useReducer,
  useState,
  useEffect,
  useContext,
} from 'react';
import { authReducer } from './utils/authReducer';
import { Action, actionTypes } from './types/types';
import Cookies from 'js-cookie';
import { refreshUser } from '../../services';
import { FakeNav } from '../../shared/fakeNav/FakeNav';
import { LoadingContext } from '../loading/LoadingContext';

export const AuthContext = createContext(null);

const getUser = async (cookieRefreshToken: string) => {
  try {
    true;
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      name: companyName,
      roles,
    } = await refreshUser(cookieRefreshToken);

    return {
      accessToken,
      refreshToken,
      companyName,
      roles,
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
    roles: [],
  };
};

export const AuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, {}, init);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [comesFrom, setComesFrom] = useState('');
  const [currentMfaFlow, setCurrentMfaFlow] = useState('');
  const [recoverEmail, setRecoverEmail] = useState('');
  const [recoverPassword, setRecoverPassword] = useState('');
  const [session, setSession] = useState('');
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [prevRoute, setPrevRoute] = useState('');
  const { setShowLoading } = useContext(LoadingContext);

  const refreshToken = Cookies.get('refreshToken');

  // Cargar el usuario de forma asíncrona al montar el componente
  useEffect(() => {
    const fetchUser = async () => {
      if (!auth.logged && refreshToken) {
        // Verificar si el usuario ya está autenticado
        try {
          setShowLoading(true);
          const user = await getUser(refreshToken);
          if (user) {
            dispatch({
              type: actionTypes.login,
              payload: user,
            });
          } else {
            dispatch({ type: actionTypes.logout });
          }
        } catch (error) {
          dispatch({ type: actionTypes.logout });
        } finally {
          setShowLoading(false);
        }
      }
      setLoading(false); // Se completa la carga
    };

    fetchUser();
  }, [refreshToken, auth.logged]); // Se ejecuta solo cuando el token cambia o cuando el estado logged cambia

  const login = (
    companyName: string,
    accessToken: string,
    refreshToken: string,
    roles: string[]
  ) => {
    Cookies.set('refreshToken', refreshToken, {
      secure: false,
      sameSite: 'Strict',
    });
    Cookies.set('accessToken', accessToken, {
      secure: false,
      sameSite: 'Strict',
    });
    Cookies.set('roles', roles, {
      secure: false,
      sameSite: 'Strict',
    });

    const action: Action = {
      type: actionTypes.login,
      payload: {
        companyName,
        accessToken,
        refreshToken,
        roles,
      },
    };
    dispatch(action);
  };

  const logout = () => {
    Cookies.remove('refreshToken');
    Cookies.remove('accessToken');
    Cookies.remove('roles');
    dispatch({ type: actionTypes.logout });
  };

  const refresh = (
    accessToken: string,
    companyName: string,
    roles: string[]
  ) => {
    dispatch({
      type: actionTypes.refresh,
      payload: { accessToken, companyName, roles },
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
        session,
        setSession,
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
