import { createContext, useState } from 'react';
import { Loading } from '../../shared/loading/Loading';

export const LoadingContext = createContext(null);

export const LoadingProvider = ({ children }) => {
  const [showLoading, setShowLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(null);
  return (
    <LoadingContext.Provider value={{ setShowLoading, setLoadingMessage }}>
      <Loading show={showLoading} loadingText={loadingMessage} />
      {children}
    </LoadingContext.Provider>
  );
};
