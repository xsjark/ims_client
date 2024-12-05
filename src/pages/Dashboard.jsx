import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = ({ type }) => {
    const { token, logout, loading, user, data, refresh } = useAuth();
    const navigate = useNavigate();
    
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{type} Dashboard</h1>
            <p>Token: {token}</p>
            <p>Welcome to the protected {type} dashboard!</p>
            <p>{JSON.stringify(data)}</p>
            <button onClick={() => logout()}>Logout</button>
            <button onClick={() => navigate('/warehouse-dashboard')}>Warehouse</button>
        </div>
    );
};

export default Dashboard;
