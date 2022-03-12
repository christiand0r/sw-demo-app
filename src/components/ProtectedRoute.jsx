import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { isAuth } = useAuth();

  if (!isAuth) return <Navigate to='/' />;

  return children;
};

export default ProtectedRoute;
