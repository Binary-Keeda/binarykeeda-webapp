import React, { Suspense, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BASE_URL } from '../../lib/config'
import axios from 'axios'
export default function Test () {
  const TestIntro = React.lazy(() => import('./TestComponents/TestIntro'))
  const TestSolve = React.lazy(() => import('./TestComponents/TestSolve'))
  const { id } = useParams()
  const { user } = useSelector(s => s.auth)
  const [hasAggreed, setHashAgreed] = useState(false);
  const [test,setTest] = useState();
  const [currSection,setCurrentSection]  = useState(null);
  const [loading,setLoading] = useState(true);
  const [testSubmission , setTestSubmission] = useState()

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/api/v2/test/submission?userId=${user._id}&testId=${id}`,{withCredentials:true}
      )
      .then(response => {
        // setTestSubmission(response.data.testSubmission)
        setTest(response.data.test)
        setTestSubmission(response.data.testSubmission);
        setHashAgreed(response.data.testSubmission.hasAgreed);
        setCurrentSection(response.data.testSubmission.curr);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch test data:', error)
      })
  }, [user._id, id])
  if(loading) return <div className='h-screen w-screen  flex justify-center items-center'> <div className="loader1"></div></div>

  return (
    <Suspense fallback={<div className='flex h-screen w-screen items-center justify-center'> <div className="loader1"></div></div>}>
      {hasAggreed ? (
        <TestSolve testSubmission={testSubmission} userId={user._id} currSection={currSection} test={test} setCurrentSection={setCurrentSection} testId={id} />
      ) : (
        <>
          <TestIntro setTestSubmission={setTestSubmission} submissionId={testSubmission._id} setTest={setTest} setHashAgreed={setHashAgreed} />
        </>
      )}
    </Suspense>
  )
}
