import React, { Suspense, useEffect } from 'react'
import UserDashboard from './Userdashboard';
const Table = React.lazy(() => import('./components/Table'));
function PracticePage () {
  return (
    <Suspense fallback={<>LOADING ... </>}>
      <Table />
    </Suspense>
  )
}




export default UserDashboard(PracticePage);