import { createContext, useContext, useState, useEffect } from 'react';

// Create Auth context
const AuthContext = createContext();

// Hard‑coded credentials
const VALID_USERNAME = 'gokiii';
const VALID_PASSWORD = 'nulll'; // plain password (you can hash it in production)
const ENCODED_PASSWORD = btoa(VALID_PASSWORD); // store encoded password for persistence

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('admin_auth');
    if (token && token === ENCODED_PASSWORD) {
      setIsAuthenticated(true);
    }
  }, []);

  // Login receives username and password, validates, stores token
  const login = (username, password) => {
    if (username === VALID_USERNAME && btoa(password) === ENCODED_PASSWORD) {
      localStorage.setItem('admin_auth', ENCODED_PASSWORD);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
