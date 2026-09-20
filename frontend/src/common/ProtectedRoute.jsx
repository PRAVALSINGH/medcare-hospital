import { useAuth } from "../../features/auth/context/AuthContext";
import { useNavigation } from "../../context/NavigationContext";

export default function ProtectedRoute({
  children,
  allowedRoles = [],
}) {
  const { user } = useAuth();
  const { navigate } = useNavigation();

  if (!user) {
    navigate("/login");
    return null;
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    navigate("/");
    return null;
  }

  return children;
}