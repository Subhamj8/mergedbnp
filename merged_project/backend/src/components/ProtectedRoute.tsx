import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import LoadingSpinner from './ui/LoadingSpinner';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  role?: UserRole | UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If role is specified, check if user has required role
  if (role && user) {
    const roles = Array.isArray(role) ? role : [role];
    if (!roles.includes(user.role)) {
      // Redirect to appropriate homepage based on user role
      if (user.role === 'admin') {
        return <Navigate to="/admin" replace />;
      } else if (user.role === 'vendor') {
        return <Navigate to="/vendor" replace />;
      } else {
        return <Navigate to="/" replace />;
      }
    }
  }

  return <>{children || <Outlet />}</>;
};

export default ProtectedRoute;