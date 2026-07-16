import React from 'react'; // Core React import
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Application Pages Import
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SkillList from './pages/SkillList';
import SkillDetail from './pages/SkillDetail';
import AddSkill from './pages/AddSkill';

// Protected Route Wrapper Component
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="text-center py-20">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

// Public Route Wrapper (redirect to dashboard if logged in)
const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="text-center py-20">Loading...</div>;
    }

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/skills" replace />} />
            <Route path="/login" element={
                <PublicRoute>
                    <Login />
                </PublicRoute>
            } />
            <Route path="/register" element={
                <PublicRoute>
                    <Register />
                </PublicRoute>
            } />
            <Route path="/skills" element={<SkillList />} />
            <Route path="/skills/:id" element={<SkillDetail />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } />
            <Route path="/skills/new" element={
                <ProtectedRoute>
                    <AddSkill />
                </ProtectedRoute>
            } />

            {/* 404 - Redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <ThemeProvider>
                    <AppRoutes />
                </ThemeProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;
