import { lazy, Suspense } from "react";
import UserDashboard from "./Userdashboard";

const ProblemSet = lazy(() => import('./components/Problemset'));
 
function Coding() {
  return <>
    <Suspense fallback={<>Loading ...</>}>
      <ProblemSet />
    </Suspense>
  </>
}


export default UserDashboard(Coding)