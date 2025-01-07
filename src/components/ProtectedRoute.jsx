import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ element }) => {
    const { accessToken, logout, loading } = useAuth();
    const navigate = useNavigate();

    if (loading) {
        return <div>Loading...</div>;
    }

    return accessToken ?
        <div>
            <button onClick={() => logout()}>Logout</button>
            <button onClick={() => navigate('/vehicle-dashboard')}>Vehicles</button>
            <button onClick={() => navigate('/customer-dashboard')}>Customers</button>
            {element}
        </div>
        : <Navigate to="/login" replace />;
};

export default ProtectedRoute;