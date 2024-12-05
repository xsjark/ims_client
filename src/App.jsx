// App.js

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/product-dashboard"
            element={<ProtectedRoute element={<Dashboard type='Product' />} />}
          />
          <Route
            path="/warehouse-dashboard"
            element={<ProtectedRoute element={<Dashboard type='Warehouse' />} />}
          />
          <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect all unknown routes to login */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;