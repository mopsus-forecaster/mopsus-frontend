import { useContext } from 'react';
import { AuthContext } from '../../contexts';
import { refreshUser } from '../../services';

export const useRefreshToken = () => {
  const { refresh: onRefresh, auth } = useContext(AuthContext);
  const refresh = async () => {
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      name: companyName,
      roles,
    } = await refreshUser(auth?.refreshToken);
    onRefresh(accessToken, companyName, refreshToken, roles);
    return accessToken;
  };
  return refresh;
};
