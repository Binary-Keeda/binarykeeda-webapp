import { lazy, Suspense } from "react";
import UserDashboard from "./Userdashboard";

const ProblemSet = lazy(() => import('./components/Problemset'));
 
function Coding() {
  return <>
    <Suspense fallback={<div className="flex justify-center items-center h-full w-full"><div className="loader2"></div></div>}>
      <ProblemSet />
    </Suspense>
  </>
}


export default Coding;