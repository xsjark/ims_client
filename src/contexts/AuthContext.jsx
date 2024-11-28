// AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../API/api'; // Adjust the import path as necessary

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Verify token on mount and refresh if necessary
    useEffect(() => {
        const refreshToken = async () => {
            try {
                const { data } = await api.refreshToken();
                setToken(data.access_token);
                setUser(data.user);
            } catch (err) {
                setError('Unable to refresh token. Please log in again.');
            } finally {
                setLoading(false);
            }
        };
    
        if (!token) {
            refreshToken();
        } else {
            setLoading(false);
        }
    }, [token]);
    

    const login = async (email, password) => {
        const { data, error } = await api.login(email, password);
        if (data) {
            setUser(data.user);
            setToken(data.access_token);
            setError(null);
        } else {
            setError('Login failed');
        }
    };

    const logout = async () => {
        if (token) {
            await api.logout(token);
        }
        setUser(null);
        setToken(null);
        setError(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};