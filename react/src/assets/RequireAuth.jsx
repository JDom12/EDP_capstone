import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthContent";

function ProtectedRoute({ allowedRoles }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
}

export default ProtectedRoute;