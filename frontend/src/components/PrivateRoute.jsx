import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, profileLoaded } = useSelector((state) => state.auth);

  // Wait for session check
  if (!profileLoaded) return <p>Checking session...</p>;

  // Once loaded, redirect if not logged in
  if (!user) return <Navigate to="/" replace />;

  return children;
};

export default PrivateRoute;
