import React, { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../../lib/config'
export default function QuizInterface ({
  questionSet = [],
  sectionId,
  testSubmissionId
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})

  const currentQuestion = questionSet[currentIndex]

  const handleOptionChange = (questionId, optionId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }))
  }

  const getButtonStyle = qId => {
    const isCurrent = questionSet[currentIndex]?._id === qId
    const isAnswered = answers[qId]
    return `px-3 py-1 border text-sm rounded-sm ${
      isCurrent
        ? 'bg-blue-700 text-white border-blue-700'
        : isAnswered
        ? 'bg-blue-100 border-blue-300 text-blue-800'
        : 'bg-gray-100 border-gray-300 text-gray-700'
    }`
  }

  const handleSubmit = () => {
    const payload = Object.entries(answers).map(
      ([questionId, selectedOptionId]) => ({
        questionId,
        selectedOptionId
      })
    )
    axios
      .post(
        `${BASE_URL}/api/v2/test/submit-section/${testSubmissionId}`,
        {
          sectionId: sectionId,
          sectionType: 'Quiz',
          quizAnswers: payload
        },
        { withCredentials: true }
      )
      .then(() => {
        window.location.reload()
      })
      .catch(e => console.log(e))
  }

  return (
    <div className='flex flex-col h-[calc(100vh-52px-70px)] lg:flex-row font-sans bg-white text-gray-800'>
      {/* Left: Question Area */}
      <div className='flex-1 flex-col justify-between flex h-full  p-10'>
        <div className='border w-full border-gray-200 rounded-md p-8 shadow-sm'>
          <div className='mb-6'>
            <h2 className='text-lg font-semibold mb-2'>
              Question {currentIndex + 1} of {questionSet.length}
            </h2>
            <p className='text-base'>{currentQuestion?.question}</p>
          </div>
          <div className='space-y-4'>
            {currentQuestion?.answerOptions?.map(option => {
              const isChecked = answers[currentQuestion._id] === option._id
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
            className='px-4 py-2 border rounded-md text-sm bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50'
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentIndex(i => Math.min(i + 1, questionSet.length - 1))
            }
            disabled={currentIndex === questionSet.length - 1}
            className='px-4 py-2 border rounded-md text-sm bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50'
          >
            Next
          </button>
        </div>
      </div>

      {/* Right: Navigator */}
      <div className='w-full h-full lg:w-1/4 border-t lg:border-t-0 lg:border-l border-gray-200 p-6 bg-white flex flex-col justify-between'>
        <div className='w-full h-full border-t  lg:border border-gray-200 p-6 bg-white flex flex-col justify-between'>
          <div>
            <h3 className='text-md font-semibold mb-4'>Question Navigator</h3>
            <div className='grid grid-cols-5 gap-2 lg:grid-cols-3'>
              {questionSet.map((q, idx) => (
                <button
                  key={q._id}
                  onClick={() => setCurrentIndex(idx)}
                  className={getButtonStyle(q._id)}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className='mt-6'>
            <button
              onClick={handleSubmit}
              className='w-full px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700'
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
