import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Skeleton Loader for lazy loaded routes
const PageSkeleton = () => (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 animate-pulse">
        <div className="h-8 w-1/3 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
        <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
            <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
            <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        </div>
    </div>
);

// Application Pages Lazy Loaded
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const SkillList = lazy(() => import('./pages/SkillList'));
const SkillDetail = lazy(() => import('./pages/SkillDetail'));
const AddSkill = lazy(() => import('./pages/AddSkill'));
const Profile = lazy(() => import('./pages/Profile'));

// Protected Route Wrapper Component
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <PageSkeleton />;
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
        return <PageSkeleton />;
    }

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

const AppRoutes = () => {
    return (
        <Suspense fallback={<PageSkeleton />}>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
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
                <Route path="/profile/:id" element={<Profile />} />

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
        </Suspense>
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
