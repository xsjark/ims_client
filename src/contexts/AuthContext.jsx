import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import fetchApi from '../helpers/FetchAPI';

const api = {
    login: (email, password) => fetchApi('/auth/login', 'POST', { email, password }),
    refreshToken: () => fetchApi('/auth/refresh-token', 'POST'),
    logout: (token) => fetchApi('/auth/logout', 'POST', undefined, token),
    verifyToken: (token) => fetchApi('/auth/verify-token', 'GET', undefined, token),
    refresh: () => fetchApi('/auth/refresh', 'POST', undefined, undefined)
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [XCSRFToken, setXCSRFToken] = useState(null)

    const login = async (email, password) => {
        setLoading(true);
        const { data, error } = await api.login(email, password);
        if (data) {
            setUser(data.user);
            setAccessToken(data.access_token);
            setError(null);
            setLoading(false);
            setXCSRFToken(data.xcsrf_token);
            return true;
        } else {
            setError('Login failed');
            setLoading(false);
            return false;
        }
    };

    // Add loading state to logout
    const logout = async () => {
        setLoading(true); 
        if (accessToken) {
            await api.logout(accessToken);
        }
        setUser(null);
        setAccessToken(null);
        setXCSRFToken(null);
        setError(null);
        setLoading(false);  
    };

    const refresh = useCallback(async () => {
        setLoading(true);
        setAccessToken(null);
        setXCSRFToken(null);
        setUser(null);
        try {
            const { data } = await api.refresh();
            if (data) {
                setAccessToken(data.session.access_token)
                setUser(data.user)
                setXCSRFToken(data.xcsrf_token)
                setError(null);
            } else {
                setError('Failed to refresh data');
                setAccessToken(null);
                setXCSRFToken(null);
                setUser(null);
            }
        } catch (error) {
            setError('An error occurred while refreshing data');
            setAccessToken(null);
            setXCSRFToken(null);
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
            user, accessToken, loading, error, login, logout, refresh, XCSRFToken
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
