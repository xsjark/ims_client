// ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Adjust the import path as necessary

const ProtectedRoute = ({ element }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while waiting for auth state
    }

    return user ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;