import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts';

export const Login = () => {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const onLogin = () => {
    login({
      id: 1,
      username: 'John Doe',
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvbiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    });
    navigate('/inicio', {
      replace: true,
    });
  };

  return (
    <div style={{ margin: '5rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Login</h1>
      <hr />
      <button
        onClick={onLogin}
        style={{ marginTop: '2rem', padding: '1rem', fontSize: '1.2rem' }}
      >
        Ingresar
      </button>
    </div>
  );
};
