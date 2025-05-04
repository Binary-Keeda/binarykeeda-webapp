import React, { useEffect, useState } from 'react'
import CodeView from './CodeView'
import axios from 'axios'
import { BASE_URL } from '../../../lib/config'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'

export default function CodingInterface({ test, currSection, testSubmission }) {
  const [currProblem, setCurrProblem] = useState(0)
  const [submittedProblems, setSubmittedProblems] = useState([])
  const { user } = useSelector(s => s.auth)

  const [currSetting, setCurrentSection] = useState(() => {
    return test.sections[currSection].problemset.map((problem, id) => ({
      id,
      language: 'cpp',
      code:
        problem.functionSignature.find(f => f.language === 'cpp')?.signature || ''
    }))
  })

  // Fetch submitted problems
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
          .map((res, idx) => (res.data.exists ? { pNo: idx, id: res.data.id } : null))
          .filter(i => i !== null)

        setSubmittedProblems(submitted)
      } catch (err) {
        console.error('Error fetching submissions:', err)
      }
    }

    fetchSubmissions()
  }, [currSection, test._id, user._id, test?.sections])

  // Update code settings when section changes
  useEffect(() => {
    setCurrentSection(prevState =>
      test.sections[currSection].problemset.map((problem, idx) => {
        return (
          prevState[idx] || {
            id: idx,
            language: 'cpp',
            code:
              problem.functionSignature.find(f => f.language === 'cpp')?.signature || ''
          }
        )
      })
    )
  }, [currSection, test.sections])

  // Handle code change
  const handleCodeChange = (id, newCode) => {
    setCurrentSection(prev => {
      const updated = [...prev]
      updated[id] = { ...updated[id], code: newCode }
      return updated
    })
  }

  // Handle language change
  const handleLanguageChange = (id, newLanguage) => {
    setCurrentSection(prev => {
      const updated = [...prev]
      const current = updated[id]

      const functionSignature = test.sections[currSection].problemset[id].functionSignature.find(
        fs => fs.language === newLanguage
      )

      updated[id] = {
        ...current,
        language: newLanguage,
        code: functionSignature?.signature || ''
      }

      return updated
    })
  }

  // Handle section submit
  const submitSection = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/v2/test/submit-section/${testSubmission._id}`,
        {
          sectionId: test.sections[currSection]._id,
          sectionType: test.sections[currSection].sectionType,
          codingAnswers:submittedProblems
        },
        { withCredentials: true }
      )
      window.location.reload();
    } catch (err) {
      console.error('Submit error:', err)
    }
  }

  return (
    <>
      {submittedProblems.length === test.sections[currSection].problemset.length && (
        <div className='fixed flex w-full justify-end pr-20 mt-4'>
          <Button onClick={submitSection} variant='contained' sx={{ bgcolor: '#000' }}>
            Submit
          </Button>
        </div>
      )}

      <div className='flex flex-wrap gap-3 px-5 py-4 bg-white shadow-sm rounded-md mb-4'>
        {test.sections[currSection].problemset.map((problem, idx) => {
          const isSubmitted = submittedProblems.some(p => p?.pNo === idx)
          const isActive = idx === currProblem

          return (
            <button
              key={idx}
              onClick={() => {
                if (isSubmitted) return
                setCurrProblem(idx)
              }}
              disabled={isSubmitted}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 border
                ${
                  isSubmitted
                    ? 'bg-green-500 text-white border-green-600 cursor-not-allowed'
                    : ''
                }
                ${
                  !isSubmitted && isActive
                    ? 'bg-orange-500 text-white border-orange-600 shadow-md'
                    : ''
                }
                ${
                  !isSubmitted && !isActive
                    ? 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300'
                    : ''
                }
              `}
              title={isSubmitted ? 'Already submitted' : 'Click to open'}
            >
              {problem.title}
            </button>
          )
        })}
      </div>

      <CodeView
        currProblem={currProblem}
        submittedProblems={submittedProblems}
        problem={test.sections[currSection].problemset[currProblem]}
        currSetting={currSetting}
        setSubmittedProblems={setSubmittedProblems}
        setCurrentSection={setCurrentSection}
        handleCodeChange={handleCodeChange}
        handleLanguageChange={handleLanguageChange}
      />
    </>
  )
}
