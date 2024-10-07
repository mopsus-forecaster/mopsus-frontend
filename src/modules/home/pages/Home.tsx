import { useRefreshToken } from '../../../hooks/useRefreshToken/useRefreshToken';

export const Home = () => {
  const refresh = useRefreshToken();
  return (
    <div>
      <button onClick={refresh}>Refresh</button>
    </div>
  );
};
