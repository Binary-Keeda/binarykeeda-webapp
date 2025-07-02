import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_CLIENT_ID } from './lib/config'
import Loaader from './layout/Loader'
import { getUser } from './redux/reducers/UserThunks'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { RoleBasedRoutes, UserRoute } from './auth/ProtectedRoutes'
import { getQuiz } from './redux/api/getQuiz'
import { getTestAdmin } from './redux/api/getTest'
import { getTestUser } from './redux/api/getTestUser'
import { getRank } from './redux/api/getRank'
import { HelmetProvider } from 'react-helmet-async'
// Lazy-loaded pages
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Redirect = lazy(() => import("./utilities/redirect"));
const MagicSignup = lazy(() => import("./pages/Signup"));

const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./utilities/NotFound"));
const CLIENT_ID = GOOGLE_CLIENT_ID;
const App = () => {
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const { user } = useSelector((state) => state.auth);

  // Pages

  /// User routes
  const UserRoadMapSheet = React.lazy(() => import("./view/user/RoadMapSheet"));
  const UserLayout = React.lazy(() => import("./view/user/Userdashboard"));
  const UserDashboard = React.lazy(() => import("./view/user/Home"));
  const UserPractice = React.lazy(() => import("./view/user/Practice"));
  const UserCoding = React.lazy(() => import("./view/user/Coding"));
  const UserCodingDescription = React.lazy(() =>
    import("./view/user/components/ProblemsetDescription")
  );
  const UserRoadmaps = React.lazy(() => import("./view/user/Roadmap"));
  const UserBlog = React.lazy(() => import("./view/user/Blog"));
  const UserSolution = React.lazy(() => import("./view/user/Solutions"));
  const UserProfile = React.lazy(() => import("./view/user/Profile"));
  const UserPreview = React.lazy(() => import("./view/user/Preview"));
  const UserPlayground = React.lazy(() => import("./view/user/Playground"));
  const UserTestList = React.lazy(() => import("./view/user/TestList"));
  const UserTest = React.lazy(() => import("./view/user/Test"));
  const UserQuizList = React.lazy(() => import("./view/user/QuizList"));
  // admin routes
  const AdminLayout = React.lazy(() =>
    import("./view/admin/layout/AdminDashboard")
  );
  const Users = lazy(() => import("./view/admin/Users"));
  const EditQuiz = lazy(() => import("./view/admin/EditQuiz"));
  const ViewQuiz = lazy(() => import("./view/admin/Quiz"));
  const AdminHome = React.lazy(() => import("./view/admin/Home"));
  const AdminTestSeries = React.lazy(() => import("./view/admin/Test"));
  const AdminTestEdit = React.lazy(() => import("./view/admin/TestEdit"));
  const AdminAddProblem = lazy(() =>
    import("./view/admin/components/AddProblem")
  );

  useEffect(() => {}, []);
  useEffect(() => {
    dispatch(getUser(token));
  }, []);
  useEffect(() => {
    if (user) {
      if (user.role == "admin") {
        getTestAdmin();
      } else {
        getTestUser();
      }
      if (!user?.rankData) {
        dispatch(getRank(user._id, user?.university));
      }
    }
  }, [user]);
  const { loading } = useSelector((s) => s.auth);
  return loading ? (
    <div className="flex h-screen w-screen justify-center items-center">
      <div className="loader1"></div>
    </div>
  ) : (
    <HelmetProvider>
      <Suspense
        fallback={
          <div className="flex h-screen w-screen justify-center items-center">
            <div className="loader1"></div>
          </div>
        }
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="user/profile/:id" element={<UserProfile />} />
            <Route element={<UserRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/signin" element={<Redirect />} />
              <Route path="/verify/:id" element={<MagicSignup />} />
            </Route>

            {/*  User But Public  */}
            <Route path="/" element={<UserLayout />}>
              <Route
                path="user/binarykeeda-dsa-sheet"
                element={<UserCoding />}
              />
              <Route
                path="user/binarykeeda-dsa-sheet/description/:topicName/:problemTitle"
                element={<UserCodingDescription />}
              />
              <Route
                path="/user/binarykeeda-210-sheet"
                element={<UserRoadMapSheet />}
              />

              <Route
                path="user/binarykeeda-roadmap-sheet"
                element={<UserRoadmaps />}
              />
              {/* <Route
                path="user/binarykeeda-roadmap-sheet/roadmap/:id"
                element={<RoadmapDetail />}
              /> */}
              <Route
                path="user/binarykeeda-roadmap-sheet/blog/:slug"
                element={<UserBlog />}
              />
            </Route>
            <Route
              path="/user"
              element={
                <RoleBasedRoutes requiredRole={"user"}>
                  <UserLayout />
                </RoleBasedRoutes>
              }
            >
              <Route index element={<UserDashboard />} />
              <Route path="practice" element={<UserPractice></UserPractice>} />
              <Route path="playground" element={<UserPlayground />} />
              <Route path="roadmaps" element={<UserRoadmaps />} />
              <Route path="practice/:name" element={<UserQuizList />} />
              <Route path="profile" element={<UserProfile />} />
              <Route element={<UserTestList />} path="test/" />
              <Route element={<UserPreview />} path="preview/:id" />

              <Route path="practice/:name" element={<UserQuizList />} />
              <Route element={<UserTestList />} path="test-series/" />
              <Route element={<UserPreview />} path="preview/:id" />
            </Route>
            <Route element={<RoleBasedRoutes requiredRole={"user"} />}>
              <Route element={<UserSolution />} path="user/solution/:id" />
              <Route element={<UserTest />} path="user/test/:id" />
            </Route>
            <Route
              path="/admin"
              element={
                <RoleBasedRoutes requiredRole={"admin"}>
                  <AdminLayout />
                </RoleBasedRoutes>
              }
            >
              <Route index element={<AdminHome />} />
              <Route path="edit/:id" element={<EditQuiz />} />
              <Route path="edit/test/:id" element={<AdminTestEdit />} />
              <Route path="users" element={<Users />} />
              <Route path="view/:id" element={<ViewQuiz />} />
              <Route path="test-series" element={<AdminTestSeries />} />
              <Route path="problem" element={<AdminAddProblem />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </HelmetProvider>
  );
};

export default App;
