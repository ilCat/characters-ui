import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import type { User } from '../types/auth';
interface ProtectedRouteProps {
  redirectPath?: string;
  user: User | null;
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  user,
  redirectPath = '/login',
  children,
}) => {

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
