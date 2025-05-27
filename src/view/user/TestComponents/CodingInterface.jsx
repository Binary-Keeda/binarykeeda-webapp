import React, { useEffect, useState } from 'react'
import CodeView from './CodeView'
import axios from 'axios'
import { BASE_URL } from '../../../lib/config'
import { useSelector } from 'react-redux'
import { Button, CircularProgress } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'

export default function CodingInterface ({ test, currSection, testSubmission }) {
  const [currProblem, setCurrProblem] = useState(0)
  const [submittedProblems, setSubmittedProblems] = useState([])
  const { user } = useSelector(s => s.auth)
  const [submitting, setSubmitting] = useState()
  const [currSetting, setCurrentSection] = useState(() => {
    return test.sections[currSection].problemset.map((problem, id) => ({
      id,
      language: 'cpp',
      code:
        problem.functionSignature.find(f => f.language === 'cpp')?.signature ||
        ''
    }))
  })

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const responses = await Promise.all(
          test?.sections[currSection].problemset.map(item =>
            axios.get(`${BASE_URL}/api/v2/test/get/problem/response`, {
              params: {
                userId: user._id,
                problemId: item._id,
                testId: test._id
              },
              withCredentials: true
            })
          )
        )

        const submitted = responses
          .map((res, idx) =>
            res.data.exists ? { pNo: idx, id: res.data.id } : null
          )
          .filter(i => i !== null)

        setSubmittedProblems(submitted)
      } catch (err) {
        console.error('Error fetching submissions:', err)
      }
    }

    fetchSubmissions()
  }, [currSection, test._id, user._id, test?.sections])

  useEffect(() => {
    setCurrentSection(prevState =>
      test.sections[currSection].problemset.map((problem, idx) => {
        return (
          prevState[idx] || {
            id: idx,
            language: 'cpp',
            code:
              problem.functionSignature.find(f => f.language === 'cpp')
                ?.signature || ''
          }
        )
      })
    )
  }, [currSection, test.sections])

  const handleCodeChange = (id, newCode) => {
    setCurrentSection(prev => {
      const updated = [...prev]
      updated[id] = { ...updated[id], code: newCode }
      return updated
    })
  }

  const handleLanguageChange = (id, newLanguage) => {
    setCurrentSection(prev => {
      const updated = [...prev]
      const current = updated[id]

      const functionSignature = test.sections[currSection].problemset[
        id
      ].functionSignature.find(fs => fs.language === newLanguage)

      updated[id] = {
        ...current,
        language: newLanguage,
        code: functionSignature?.signature || ''
      }

      return updated
    })
  }

  const submitSection = async () => {
    try {
      setSubmitting(true)
      await axios.post(
        `${BASE_URL}/api/v2/test/submit-section/${testSubmission._id}`,
        {
          sectionId: test.sections[currSection]._id,
          sectionType: test.sections[currSection].sectionType,
          codingAnswers: submittedProblems
        },
        { withCredentials: true }
      )
      window.location.reload()
      // setCurrentSection(currSection+1)
    } catch (err) {
      console.error('Submit error:', err)
    } finally {
      setSubmitting(false)
    }
  }
  useEffect(() => {
    if (
      submittedProblems.length == test.sections[currSection].problemset.length
    )
      submitSection()
  }, [submittedProblems])

  return (
    <>
      {submittedProblems.length ===
        test.sections[currSection].problemset.length && (
        <div className='fixed top-[67px]  flex w-full justify-end pr-24'>
          <Button
            disabled={submitting}
            onClick={submitSection}
            variant='contained'
            sx={{ bgcolor: '#000' }}
          >
            {submitting ? <CircularProgress size={14} /> : 'Submit'}
          </Button>
        </div>
      )}

      <div className='fixed right-0 top-[70px] h-[calc(100vh-70px)] px-5 py-4 bg-gray-50 shadow-sm rounded-md mb-4'>
        <div className='relative flex flex-col items-center gap-6'>
          {/* Vertical Line */}
          <div className='absolute top-0 bottom-0 left-1/2 w-[2px] bg-gray-400 z-0'></div>

          {test.sections[currSection].problemset.map((problem, idx) => {
            const isSubmitted = submittedProblems.some(p => p?.pNo === idx)
            const isActive = idx === currProblem

            return (
              <span
                key={idx}
                onClick={() => {
                  if (isSubmitted) return
                  setCurrProblem(idx)
                }}
                disabled={isSubmitted}
                className={`relative border-gray-300 border-2 z-10 flex justify-center items-center h-[35px] w-[35px] rounded-full text-sm font-medium transition duration-200
            ${
              isSubmitted
                ? 'bg-blue-500 text-white border-green-600 cursor-not-allowed'
                : isActive
                ? 'bg-blue-500  text-white cursor-pointer shadow-md'
                : 'bg-gray-100 text-gray-800 cursor-pointer hover:bg-gray-200 border-gray-300'
            }
          `}
                title={isSubmitted ? 'Already submitted' : 'Click to open'}
              >
                {isSubmitted ?   <CheckCircle fontSize='small' className='text-blue-400' />:idx+1} 
              </span>
            )
          })}
        </div>
      </div>
      {currProblem < test.sections[currSection].problemset.length && (
        <CodeView
          setCurrProblem={setCurrProblem}
          currProblem={currProblem}
          submittedProblems={submittedProblems}
          problem={test.sections[currSection].problemset[currProblem]}
          currSetting={currSetting}
          setSubmittedProblems={setSubmittedProblems}
          setCurrentSection={setCurrentSection}
          handleCodeChange={handleCodeChange}
          handleLanguageChange={handleLanguageChange}
        />
      )}
    </>
  )
}
