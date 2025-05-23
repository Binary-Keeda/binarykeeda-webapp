import React, { useEffect, useState } from 'react'
import axios from 'axios'
import QuizInterface from './QuizInterface'
import { Button, Divider, IconButton, Typography } from '@mui/material'
import { BASE_URL, LOGO } from '../../../lib/config'
import { useSelector } from 'react-redux'
import CodingInterface from './CodingInterface'
import {
  ArrowRight,
  CheckCircle,
  Close,
  Lock,
  ShortText
} from '@mui/icons-material'

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
  // Set Timer for Quiz
  
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
  if(testSubmission.isSubmitted)  { 
    return <>Quiz has been submitted
      view Response in home section
    </>
  }
  return (
    <>
      <header className='flex gap-8 relative h-[70px] items-center left-0 shadow-sm w-full p-4'>
        <nav className='flex gap-8 fixed h-[70px] z-20 justify-between bg-white left-0 top-0 items-center shadow-sm w-full p-4'>
          <div className='flex items-center gap-5'>
            <img src={LOGO} className='h-9' alt='Logo' />
          </div>

          <div className='flex items-center gap-5'>
            <p>Time left</p>
            {timeLeft > 0 ? (
              <div className='flex gap-4 items-center px-3 p-1 bg-orange-500 text-gray-900 rounded-sm shadow-md'>
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
              <span className='text-red-500 font-bold'>
                Time's Up! Submitting...
              </span>
            )}
          </div>
        </nav>
      </header>

      <div className='flex fixed justify-end right-0  pt-4 px-4   z-50 '>
         
        <IconButton
          onClick={() => {
            setShowSideBar(true)
          }}
          color='primary'
        >
          <ShortText />
        </IconButton>
      </div>
      <div
        className={`fixed ${
          showSidebar ? '' : 'translate-x-full'
        } top-[70px] transition-all duration-50 ease-linear right-0 bg-gray-50 p-5 w-[200px] h-[calc(100vh-70px)] z-50 flex flex-col gap-5`}
      >
        <div className='flex  justify-start'>
          <IconButton
            onClick={() => {
              setShowSideBar(false)
            }}
          >
            <ArrowRight />
          </IconButton>
        </div>
        {test?.sections.map((section, idx) => {
          const isActive = idx === currSection
          const isCompleted = idx < currSection
          const isLocked = idx > currSection

          return (
            <div
              key={idx}
              className={`py-3 text-sm w-full rounded-lg flex justify-between items-center px-3 cursor-pointer transition duration-300
              ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'bg-orange-400 text-white hover:bg-orange-500'
              }
            `}
            >
              <span>{section.name}</span>
              {isCompleted && (
                <CheckCircle fontSize='small' className='text-white' />
              )}
              {isLocked && <Lock fontSize='small' className='text-gray-200' />}
            </div>
          )
        })}
      </div>

      {test.sections[currSection].sectionType == 'Quiz' ? (
        <QuizInterface testSubmissionId={testSubmission._id} sectionId={test.sections[currSection]._id} questionSet={test.sections[currSection]?.questionSet}/>
      ) : (
        <CodingInterface testSubmission={testSubmission} currSection={currSection} test={test} />
      )}
    </>
  )
}


