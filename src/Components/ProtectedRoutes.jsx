import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const isAuthenticated = useSelector((state) => {
    console.log(state);
    return state.auth.isAuthenticated;
  });

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
