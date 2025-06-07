import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../../lib/config'
import { Button, Modal, Box, Typography } from '@mui/material'

export default function QuizInterface({
  questionSet = [],
  sectionId,
  testSubmissionId
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [visitedQuestions, setVisitedQuestions] = useState(new Set())
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const currentQuestion = questionSet[currentIndex]

  useEffect(() => {
    if (currentQuestion?._id) {
      setVisitedQuestions(prev => new Set(prev).add(currentQuestion._id))
    }
  }, [currentIndex, currentQuestion])

  const handleOptionChange = (questionId, optionId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }))
  }

  const getButtonStyle = qId => {
    const isCurrent = questionSet[currentIndex]?._id === qId
    const isAnswered = answers[qId]
    const isVisited = visitedQuestions.has(qId)

    let base = 'p-2 border text-sm'

    if (isCurrent) {
      return `${base} bg-blue-700 text-white border-blue-700`
    }
    if (isAnswered) {
      return `${base} bg-green-100 border-green-400 text-green-800`
    }
    if (isVisited) {
      return `${base} bg-orange-100 border-orange-400 text-orange-800`
    }
    return `${base} bg-red-100 border-red-400 text-red-800`
  }

  const handleSubmit = () => {
    setShowConfirmModal(false)
    setLoading(true)
    axios
      .post(
        `${BASE_URL}/api/v2/test/submit-section/${testSubmissionId}`,
        {
          sectionId: sectionId,
          sectionType: 'Quiz',
          quizAnswers: answers
        },
        { withCredentials: true }
      )
      .then(() => {
        setShowConfirmModal(false)
        window.location.reload()
      })
      .catch(e => {
        console.log(e)
        setLoading(false)
      })
  }

  return (
    <div className='flex flex-col h-[calc(100vh-52px-70px)] lg:flex-row font-sans bg-white text-gray-800'>
      {/* Left: Question Area */}
      <div className='flex-1 flex-col justify-between flex h-full p-5'>
        <div className='border w-full border-gray-200 rounded-sm p-8 shadow-sm'>
          <div className='mb-6'>
            <h2 className='text-lg font-semibold mb-2'>
              Question {currentIndex + 1} of {questionSet.length}
            </h2>
            <p className='text-base'>{currentQuestion?.question}</p>
          </div>
          <div className='space-y-4'>
            {currentQuestion?.answerOptions?.map(option => {
              const isChecked = answers[currentQuestion._id] == option._id;
              return (
                <label
                  key={option._id}
                  className={`flex items-center border p-3 rounded-md cursor-pointer transition ${
                    isChecked ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <input
                    type='radio'
                    className='mr-3'
                    name={`question-${currentQuestion._id}`}
                    value={option._id}
                    checked={isChecked}
                    onChange={() =>
                      handleOptionChange(currentQuestion._id, option._id)
                    }
                  />
                  <span className='text-sm'>{option.text}</span>
                </label>
              )
            })}
          </div>
        </div>

        <div className='mt-8 justify-end flex items-center gap-4'>
          <button
            onClick={() => setCurrentIndex(i => Math.max(i - 1, 0))}
            disabled={currentIndex === 0}
            className='px-4 py-2 border rounded-md text-sm bg-[#1876d2] text-white disabled:opacity-50'
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentIndex(i => Math.min(i + 1, questionSet.length - 1))
            }
            disabled={currentIndex === questionSet.length - 1}
            className='px-4 py-2 border rounded-md text-sm bg-[#1876d2] text-white disabled:opacity-50'
          >
            Next
          </button>
        </div>
      </div>

      {/* Right: Navigator & Info */}
      <div className='w-full h-full lg:w-1/4 border-t lg:border-t-0 lg:border-l border-gray-200 p-6 bg-white flex flex-col justify-between'>
        <div className='w-full h-full flex flex-col justify-between'>
          <div>
            <h3 className='text-md font-semibold mb-4'>Question Navigator</h3>
            <div className='grid grid-cols-6 gap-2 lg:grid-cols-5'>
              {questionSet.map((q, idx) => (
                <button
                  key={q._id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`${getButtonStyle(q._id)} rounded-full h-[40px] w-[40px]`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {/* Color Legend */}
            <div className='mt-6'>
              <h4 className='text-sm font-semibold mb-2'>Color Legend</h4>
              <div className='flex flex-col gap-2 text-sm'>
                <div className='flex items-center gap-2'>
                  <span className='w-4 h-4 rounded-sm bg-blue-700 inline-block'></span>
                  <span>Current Question</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='w-4 h-4 rounded-sm bg-green-100 border border-green-400 inline-block'></span>
                  <span>Attempted</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='w-4 h-4 rounded-sm bg-orange-100 border border-orange-400 inline-block'></span>
                  <span>Seen but Unattempted</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='w-4 h-4 rounded-sm bg-red-100 border border-red-400 inline-block'></span>
                  <span>Unseen</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={() => setShowConfirmModal(true)}
            variant='contained'
            color='primary'
            fullWidth
            disabled={loading}
          >
            Submit
          </Button>
        </div>
      </div>

      {/* Submission Confirmation Modal */}
      <Modal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        aria-labelledby="submit-confirm-title"
        aria-describedby="submit-confirm-description"
      >
        <Box
          className="absolute bg-white p-6 rounded-md shadow-lg"
          sx={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600
          }}
        >
          <Typography id="submit-confirm-title" variant="h6" component="h2" className="mb-4">
            Confirm Submission
          </Typography>
          <Typography id="submit-confirm-description" className="mb-4 text-sm text-gray-700">
            Are you sure you want to submit your quiz? You won't be able to change your answers later.
          </Typography>
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={() => setShowConfirmModal(false)} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Confirm
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
