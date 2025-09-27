/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../composantDashbord/LoadingSpinner";


const AuthProtected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner/>;
  if (user) return <Navigate to="/" replace />; 

  return children;
};

export default AuthProtected;
