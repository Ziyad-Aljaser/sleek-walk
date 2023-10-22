import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Used to protect the path from users that are not logged in. It redirect the user to the login page
const PrivateWrapper = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/login" replace />;
};

export default PrivateWrapper;
