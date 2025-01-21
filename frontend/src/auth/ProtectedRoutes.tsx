import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
type props={
    children:React.ReactNode
}
const ProtectedRoute = ({ children }:props) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;