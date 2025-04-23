import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { Role } from "../../../generated/graphql";

interface ProtectedProps {
  allowedRoles: Role[];
  children: React.ReactElement;
}

const Protected = (props: ProtectedProps) => {
  const { allowedRoles, children } = props;
  const { user } = useAuth();
  const location = useLocation();

  return user?.roles.find((role) => allowedRoles?.includes(role)) ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default Protected;
