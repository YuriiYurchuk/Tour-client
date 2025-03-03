import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { user, accessToken, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <p>Завантаження...</p>;
  }

  if (!accessToken || !user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
