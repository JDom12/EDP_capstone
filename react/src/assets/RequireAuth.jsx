function ProtectedRoute({ allowedRoles }) {
    const { user } = useAuth();
    const { id } = useParams();

    if (!user) {
        return <Navigate to="/login" />;
    }

    // HR
    if (user.role === "HR") {
        return <Outlet />;
    }

    // own profile
    if (user.id === parseInt(id)) {
        return <Outlet />;
    }

    // managers
    if (user.manages?.includes(parseInt(id))) {
        return <Outlet />;
    }

    return <Navigate to="/unauthorized" />;
}

export default ProtectedRoute;