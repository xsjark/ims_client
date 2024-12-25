import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = ({ type }) => {
    const { accessToken, logout, loading } = useAuth();
    const navigate = useNavigate();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <button onClick={() => logout()}>Logout</button>
            <button onClick={() => navigate('/warehouse-dashboard')}>Warehouse</button>
            <h1>{type} Dashboard</h1>
            <p>Token: {accessToken}</p>
        </div>
    );
};

export default Dashboard;
