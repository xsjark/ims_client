import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
    const { token, logout } = useAuth();
    console.log(token)
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the protected dashboard!</p>
            <button onClick={() => logout(token)}>Logout</button>
        </div>
    );
};

export default Dashboard;