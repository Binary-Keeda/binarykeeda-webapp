import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const UserRoute = () => {
    const { user, loading } = useSelector(s => s.auth);
    
    if (loading) return <div>Loading...</div>;  
    if (user) {
        return <Navigate to={`/${user.role}`} />;
    }
    return <Outlet />;
}

export const RoleBasedRoutes = ({ requiredRole, children }) => {
    const { user, loading } = useSelector(s => s.auth);
    
    if (loading) return <div>Loading...</div>;  // Or a loading spinner
    
    if (!user || !(user.role === requiredRole)) {
        return <Navigate to="/login" replace />;
    }

    return children || <Outlet />;
}
