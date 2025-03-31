import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

export const UserRoute = () => {

}

export const RoleBasedRoutes = ({requiredRole,children}) => {
    const {user} =useSelector(s=>s.auth);
    if(user?.role == requiredRole) return children || <Outlet/>
    else return <Navigate to="/login" replace={true}/>
}