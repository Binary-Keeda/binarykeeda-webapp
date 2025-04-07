import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

export const UserRoute = () => {
    const {user} =useSelector(s=>s.auth);
    if(user) return <Navigate to={`/user`}/>
    return <Outlet/>
}
    
export const RoleBasedRoutes = ({requiredRole,children}) => {
    const {user} =useSelector(s=>s.auth);
    if(user?.role == requiredRole) return children || <Outlet/>
    else return <Navigate to="/login" replace={true}/>
}