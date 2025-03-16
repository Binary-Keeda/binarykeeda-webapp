import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import GoogleSignInPopup from './utilities/GooglePopup';
import { GOOGLE_CLIENT_ID } from './lib/config';
import Loaader from './layout/Loader';
import { getUser } from './redux/reducers/UserThunks';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie'
import { RoleBasedRoutes } from './auth/ProtectedRoutes';
import { getQuiz } from './redux/api/getQuiz';
// Lazy-loaded pages
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Redirect = lazy(() => import('./utilities/redirect'));
const Home = lazy(() => import('./pages/Home'))
const CLIENT_ID = GOOGLE_CLIENT_ID;
const App = () => {
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const {user} = useSelector((state) => state.auth);
  /// User routes
  const UserDashboard = React.lazy(() => import('./view/user/Home'));
  const UserPractice = React.lazy(() => import('./view/user/Practice'));
  const UserCoding = React.lazy(()=> import('./view/user/Coding'));
  const UserRoadmaps = React.lazy(() => import('./view/user/Roadmap'))
  useEffect(() => {
    dispatch(getUser(token));
  }, [])
  useEffect(() => {
    if (user) {
      getQuiz()
    }
  }, [user])
  const { loading } = useSelector(s => s.auth)
  return loading ? <Loaader /> :
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      {/* <GoogleSignInPopup /> */}
      <Suspense fallback={<Loaader />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signin" element={<Redirect />} />
            <Route path='/user' element={<RoleBasedRoutes requiredRole={"user"} />} >
              <Route index element={<UserDashboard />} />
              <Route path='practice' element={<UserPractice></UserPractice>} />
              <Route path='coding' element={<UserCoding/>} />
              <Route path='roadmaps' element={<UserRoadmaps/>}/>
            </Route>
            <Route path='/admin' element={<RoleBasedRoutes requiredRole={"admin"} />} >
              <Route index element={<></>} />
            </Route>
          </Routes>


        </BrowserRouter>
      </Suspense>
    </GoogleOAuthProvider>;
};

export default App;
