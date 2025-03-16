import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import jsPDF from 'jspdf'
import { Link } from 'react-scroll'

export default function Preview () {
  const [currSolution, setCurrSolution] = useState([])
  const { solutions } = useSelector(state => state.solution)
  const { user } = useSelector(s => s.auth)
  const { id } = useParams()

  useEffect(() => {
    setCurrSolution(solutions.filter(solution => solution._id === id))
  }, [solutions, id])

  if (currSolution.length === 0) {
    return (
      <div className='text-center text-xl text-red-600'>
        No solution found for this ID.
      </div>
    )
  }

  const currentQuiz = currSolution[0]?.quizId
  const userResponses = currSolution[0]?.response

  if (!currentQuiz) {
    return (
      <div className='text-center text-xl text-red-600'>
        Quiz data is missing or incomplete.
      </div>
    )
  }

  const totalScore = currentQuiz.questions.reduce((score, question) => {
    const userResponse = userResponses ? userResponses[question._id] : undefined

    if (question.category === 'MCQ') {
      const selectedOption = question.options.find(
        option => option._id === userResponse
      )
      if (selectedOption?.isCorrect) {
        return score + question.marks
      } else if (userResponse) {
        return score + question.negative
      }
    }

    if (question.category === 'Text') {
      const isCorrect = userResponse === question.answer
      if (isCorrect) {
        return score + question.marks
      } else if (userResponse) {
        return score + question.negative
      }
    }

    return score
  }, 0)

  const downloadPDF = () => {
    const doc = new jsPDF()
    let yOffset = 10

    // Add Quiz Details
    doc.setFontSize(16)
    doc.text(currentQuiz.title, 10, yOffset)
    yOffset += 10
    doc.setFontSize(12)
    doc.text(`Category: ${currentQuiz.category}`, 10, yOffset)
    yOffset += 6
    doc.text(`Your Score: ${totalScore}/${currentQuiz.marks}`, 10, yOffset)
    yOffset += 10

    // Add Questions and Responses
    currentQuiz.questions.forEach((question, idx) => {
      doc.setFontSize(10)
      doc.text(
        `Q${idx + 1}: ${question.question} (${question.marks} Marks)`,
        10,
        yOffset
      )
      yOffset += 6

      question.options.forEach((option, idx) => {
        const userResponse = userResponses
          ? userResponses[question._id]
          : undefined
        const isSelected = userResponse === option._id
        const isCorrect = option.isCorrect

        doc.setFontSize(10)
        doc.text(`${idx + 1}. ${option.text}`, 10, yOffset)
        yOffset += 6
      })

      const correctAnswer = question.options.find(option => option.isCorrect)
      const userAnswer = question.options.find(
        option => option._id === userResponses[question._id]
      )

      doc.setFontSize(9)
      doc.text(
        `Correct Answer: ${correctAnswer ? correctAnswer.text : 'None'}`,
        10,
        yOffset
      )
      yOffset += 6

      doc.text(
        `Your Answer: ${userAnswer ? userAnswer.text : 'No Answer Provided'}`,
        10,
        yOffset
      )
      yOffset += 10

      if (yOffset > 270) {
        doc.addPage()
        yOffset = 10
      }
    })

    doc.save(`${user.name}_${currentQuiz.title}_marksheet.pdf`)
  }

  return (
    <div className='container'>
      <div className='flex w-full justify-between items-start'>
        <div className='flex-1 w-full'>
          {currentQuiz.questions.map((question, idx) => {
            const userResponse = userResponses
              ? userResponses[question._id]
              : undefined
            const isCorrectAnswer =
              question.category === 'MCQ'
                ? question.options.find(option => option._id === userResponse)
                    ?.isCorrect || false
                : question.answer === userResponse

            return (
              <div
                key={question._id}
                id={`question-${idx}`}
                className='shadow-md rounded-lg p-6  dark:bg-gray-800 dark:text-gray-50 mb-6'
              >
                <h3 className='font-semibold text-lg dark:text-gray-50 text-gray-800'>
                  Question {idx + 1}: {question.question}
                </h3>
                <p className='text-gray-600 dark:text-gray-200 mb-4'>
                  {isCorrectAnswer
                    ? `+${question.marks} Marks`
                    : userResponse
                    ? `${question.negative} Marks`
                    : 'Not Attempted'}
                </p>

                {question.category === 'MCQ' &&
                  question.options?.map(option => {
                    const isSelected = userResponse === option._id
                    const isCorrect = option.isCorrect

                    return (
                      <div
                        key={option._id}
                        style={{
                          backgroundColor: isSelected
                            ? isCorrect
                              ? '#A8D08D' // light green
                              : '#F8D7DA' // light red
                            : isCorrect
                            ? '#A8D08D'
                            : 'transparent'
                        }}
                        className='p-4 border flex gap-2 rounded-lg mt-4'
                      >
                        <p className='text-gray-700 dark:text-gray-200'>{option.text}</p>
                        {isSelected &&
                          (isCorrect ? (
                            <span className='text-green-600 font-medium'>
                              ✔ Your Answer
                            </span>
                          ) : (
                            <span className='text-red-600 font-medium'>
                              ✖ Wrong Answer
                            </span>
                          ))}
                      </div>
                    )
                  })}
                {question.category === 'Text' && (
                  <>
                    <p>Your Answer: {userResponse || 'Not Attempted'}</p>
                    <p className='text-gray-700'>
                      Correct Answer: {question.answer}
                    </p>
                  </>
                )}
              </div>
            )
          })}
        </div>
        <div className='w-80'></div>
        <div className='w-80 ml-8 h-[calc(100vh-71px)] p-4 fixed top-[71px] right-0 border-l-[1px] border-gray-300  dark:bg-gray-800 dark:text-gray-50 overflow-hidden'>
          {' '}
          <h2 className='font-semibold text-lg text-gray-800 mb-1'>
            {currentQuiz.title}
          </h2>
          <h3 className='text-sm text-nowrap text-gray-500 mb-1'>
            Your Score: {totalScore}/{currentQuiz.marks}
          </h3>
          <i
            onClick={downloadPDF}
            className='underline mb-7 cursor-pointer text-blue-400'
          >
            Click to download marksheet
          </i>
          <div className='grid mt-3  grid-cols-5 m-auto gap-1 custom-scrollbar'>
            {currentQuiz.questions.map((_, idx) => (
              <div key={idx} className='flex justify-center items-center'>
                <Link
                  to={`question-${idx}`}
                  smooth={true}
                  duration={500}
                  offset={-100}
                  className='w-12 h-12 cursor-pointer rounded-full py-2 bg-gray-200 dark:bg-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors'
                >
                  {idx + 1}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
