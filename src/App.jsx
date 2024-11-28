import React, { useEffect, useState } from 'react';
import { createAuthManager } from './auth/auth';

const auth = createAuthManager(); 

const App = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
      const verifyUser = async () => {
          if (!auth.getToken()) {
              // If there's no token, try to refresh
              const refreshed = await auth.refreshToken();
              if (!refreshed) {
                  setError('Unable to refresh token. Please log in again.');
                  setLoading(false);
                  return;
              }
          }

          // If there's a valid token, verify it
          const isVerified = await auth.verifyToken();
          if (isVerified) {
              setUser(auth.getUser());
          } else {
              setError('User not authenticated');
          }
          setLoading(false);
      };

      verifyUser();
  }, []);

    const handleLogin = async (email, password) => {
        const success = await auth.login(email, password);
        if (success) {
            setUser(auth.getUser());
            setError(null);
        } else {
            setError('Login failed');
        }
    };

    const handleLogout = async () => {
        await auth.logout();
        setUser(null);
        setError(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {user ? (
                <div>
                    <h1>Welcome, {user.email}</h1>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <h1>Please Log In</h1>
                    <button onClick={() => handleLogin('admin1@test.com', 'pass1234')}>Login</button>
                    {error && <p>{error}</p>}
                </div>
            )}
        </div>
    );
};

export default App;