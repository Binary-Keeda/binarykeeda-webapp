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
import NotFound from './utilities/NotFound';
import QuizList from './view/user/QuizList';
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
  const UserLayout = React.lazy(() => import('./view/user/Userdashboard'));
  const UserDashboard = React.lazy(() => import('./view/user/Home'));
  const UserPractice = React.lazy(() => import('./view/user/Practice'));
  const UserCoding = React.lazy(()=> import('./view/user/Coding'));
  const UserRoadmaps = React.lazy(() => import('./view/user/Roadmap')); 
  const UserSolution = React.lazy(()=> import('./view/user/Solutions'));
  const UserPreview = React.lazy(() => import('./view/user/Preview'));
  const UserPlayground = React.lazy(() => import('./view/user/Playground'));
  const UserTestList = React.lazy(() => import('./view/user/TestList'));
  const UserTest = React.lazy(() => import('./view/user/Test'));
  const UserQuizList = React.lazy(()=> import('./view/user/QuizList'));
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
            <Route path='/user' element={<RoleBasedRoutes requiredRole={"user"} ><UserLayout/> </RoleBasedRoutes>} >
              <Route index element={<UserDashboard />} />
              <Route path='practice' element={<UserPractice></UserPractice>} />
              <Route path='coding' element={<UserCoding/>} />
              <Route path='playground' element={<UserPlayground/>}/>
              <Route path='roadmaps' element={<UserRoadmaps/>}/>
              <Route path='practice/:name' element={<QuizList/>}/>
              <Route element={<UserTestList />} path='test/' />
           
            </Route>
            <Route  element={<RoleBasedRoutes requiredRole={"user"} />} >
              <Route element={<UserSolution />} path='user/solution/:id' />
              <Route element={<UserPreview />} path='user/preview/:id' />
              <Route element={<UserTest />} path='user/test/:id' />
            </Route>
            <Route path='/admin' element={<RoleBasedRoutes requiredRole={"admin"} />} >
              <Route index element={<></>} />
            </Route>
            <Route path='*' element={<NotFound/>} />
          </Routes>


        </BrowserRouter>
      </Suspense>
    </GoogleOAuthProvider>;
};

export default App;
