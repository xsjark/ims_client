// App.js

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { Vehicles } from './pages/Vehicles';
import './App.css'
import { Customers } from './pages/Customers';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/vehicle-dashboard"
            element={<ProtectedRoute element={<Vehicles />} />}
          />
          <Route
            path="/customer-dashboard"
            element={<ProtectedRoute element={<Customers />} />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;