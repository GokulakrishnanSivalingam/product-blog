import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Incorrect username or password');
    }
  };

  return (
    <div className="login-page" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh'
    }}>
      <form onSubmit={handleSubmit} className="login-form" style={{
        background: 'var(--card-bg)',
        padding: '30px',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        width: '320px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Login</h2>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)'
            }}
            required
          />
        </div>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)'
            }}
            required
          />
        </div>
        {error && (
          <p style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{error}</p>
        )}
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
