import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

export const UserRoute = () => {

}

export const RoleBasedRoutes = ({requiredRole}) => {
    const {user} =useSelector(s=>s.auth);
    if(user?.role == requiredRole) return <Outlet/>
    else return <Navigate to="/login" replace={true}/>
}