import { useEffect, useState } from 'react'
import QuizInterface from './QuizInterface'
import { Divider, IconButton } from '@mui/material'
import { LOGO } from '../../../lib/config'
import { useSelector } from 'react-redux'
import CodingInterface from './CodingInterface'
import {
  ArrowRight,
  CheckCircle,
  Close,
  Lock,
  ShortText
} from '@mui/icons-material'
import { Link } from 'react-router-dom'

export default function TestSolve ({
  userId,
  testSubmission,
  testId,
  currSection,
  setCurrentSection,
  test
}) {
  const [timeLeft, setTimeLeft] = useState(0)
  const { user } = useSelector(s => s.auth)
  const [showSidebar, setShowSideBar] = useState(false)

  useEffect(() => {
    if (test && testSubmission) {
      const startTime = new Date(testSubmission.startedAt).getTime()
      const quizEndTime = startTime + test.duration * 60 * 1000

      const interval = setInterval(() => {
        const remainingTime = quizEndTime - Date.now()
        setTimeLeft(Math.max(remainingTime, 0))

        if (remainingTime <= 0) {
          clearInterval(interval)
          handleSubmit()
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [testSubmission, test])

  const handleSubmit = () => {
    console.log("Time's up! Submitting test...")
  }
  if (testSubmission.isSubmitted) {
    return <><SubmissionPage testSubmission={testSubmission} /></>
  }
  return (
    <>
      <header className='flex gap-8 relative h-[60px] items-center left-0 shadow-sm w-full p-4'>
        <nav className='flex gap-8 fixed h-[60px] z-20 justify-between bg-white left-0 top-0 items-center shadow-sm w-full p-4'>
          <div className='flex items-center gap-5'>
            <img src={LOGO} className='h-9' alt='Logo' />
          </div>

          <div className='flex items-center gap-5'>
            <p>Time left</p>
            {timeLeft > 0 ? (
              <div className='flex gap-4 items-center px-3 p-1 bg-gray-300 text-gray-900 rounded-sm shadow-md'>
                <div className='flex items-center gap-2 text-md '>
                  <span className='text-lg animate-pulse'></span>
                  {Math.floor(timeLeft / 60000)} m
                </div>
                <Divider
                  orientation='vertical'
                  flexItem
                  className='border-gray-300'
                />
                <div className='flex items-center gap-2 text-md '>
                  <span className='text-lg animate-pulse'> </span>
                  {Math.floor((timeLeft % 60000) / 1000)} s
                </div>
              </div>
            ) : (
              <span className='text-red-500 font-bold'>Loading....</span>
            )}
            <div className='cursor-pointer'>
            <ShortText/>
            </div>
          </div>
        </nav>
      </header>

      <div className='flex px-3 py-2 shadow-sm bg-gray-50 items-center gap-2'>
        {test?.sections.map((section, idx) => {
          const isActive = idx === currSection
          const isCompleted = idx < currSection
          const isLocked = idx > currSection

          return (
            <div
              key={idx}
              className={`w-[140px] py-2 px-3 rounded-lg shadow-sm text-sm flex justify-between items-center cursor-pointer transition duration-300
    ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'bg-white hover:bg-blue-50 text-blue-800'
    }
  `}
            >
              <span className='mr-2 font-medium truncate'>{section.name}</span>
              <div className='flex items-center gap-1'>
                {isCompleted && (
                  <CheckCircle fontSize='small' className='text-blue-400' />
                )}
                {isLocked && (
                  <Lock fontSize='small' className='text-blue-200' />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {test.sections[currSection].sectionType == 'Quiz' ? (
        <QuizInterface
          testSubmissionId={testSubmission._id}
          sectionId={test.sections[currSection]._id}
          questionSet={test.sections[currSection]?.questionSet}
        />
      ) : (
        <CodingInterface
          testSubmission={testSubmission}
          currSection={currSection}
          test={test}
        />
      )}
    </>
  )
}





function SubmissionPage({ testSubmission }) {
  if (!testSubmission?.isSubmitted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-xl w-full text-center">
        <h1 className="text-2xl font-bold text-green-700 mb-4">
          Test Submitted Successfully
        </h1>
        <p className="text-gray-700 text-base mb-6">
          Your test response has been successfully recorded. <br />
          You may review your answers in the <span className="font-medium text-blue-600">Preview</span> section.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm transition-all">
              Return to Home
            </button>
          </Link>
          <Link to="/user">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-md text-sm transition-all">
              View Response
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

