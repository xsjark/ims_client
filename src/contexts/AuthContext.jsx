import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
const API_URL = 'http://localhost:3000';

async function fetchApi(endpoint, method = 'GET', body, token) {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
            credentials: 'include', // This is important for handling cookies
        });

        const data = await response.json();

        if (!response.ok) {
            throw data.error;
        }

        return data;
    } catch (error) {
        return {
            data: null,
            error: {
                code: error.code || 'UNKNOWN_ERROR',
                message: error.message || 'An unexpected error occurred',
            },
        };
    }
}

const api = {
    login: (email, password) => fetchApi('/auth/login', 'POST', { email, password }),

    refreshToken: () => fetchApi('/auth/refresh-token', 'POST'),

    logout: (token) => fetchApi('/auth/logout', 'POST', undefined, token),

    verifyToken: (token) => fetchApi('/auth/verify-token', 'GET', undefined, token),

    refresh: () => fetchApi('/api/refresh', 'POST', undefined, undefined)
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);  // Global loading state
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const login = async (email, password) => {
        setLoading(true);  // Set loading to true when login starts
        const { data, error } = await api.login(email, password);
        if (data) {
            setUser(data.user);
            setToken(data.access_token);
            setError(null);
            setLoading(false);  // Set loading to false after login finishes
            return true;
        } else {
            setError('Login failed');
            setLoading(false);  // Set loading to false if login fails
            return false;
        }
    };

    // Add loading state to logout
    const logout = async () => {
        setLoading(true);  // Set loading to true when logout starts
        if (token) {
            await api.logout(token);
        }
        setUser(null);
        setToken(null);
        setError(null);
        setLoading(false);  // Set loading to false after logout finishes
    };

    const refresh = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.refresh();
            if (data) {
                setData(data);
                setToken(data.session.access_token)
                setError(null);
            } else {
                setError('Failed to refresh data');
                setToken(null);
                setUser(null);
            }
        } catch (error) {
            setError('An error occurred while refreshing data');
            setToken(null);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const handleRefresh = async () => {
            try {
                await refresh();
                console.log('Refreshing...');
            } catch (error) {
                console.error('Error refreshing token:', error);
            }
        };
    
        handleRefresh();
    }, []);



    return (
        <AuthContext.Provider value={{
            user, token, loading, error, login, logout, data, refresh
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
