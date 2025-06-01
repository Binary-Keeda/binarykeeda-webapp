import { useState, useEffect } from 'react'
import { Editor } from '@monaco-editor/react'
import axios from 'axios'
import { BASE_URL, CODE_EXECUTION_API, headers } from '../../../lib/config'
import { NavigateBefore, NavigateNext } from '@mui/icons-material'
import CodeOutputWindow from './CodeOutput'
import { geminiReview, runCodeBatch } from './codeUtils'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Button, Modal, Typography } from '@mui/material'

function formatEscapedNewlines (text) {
  return text.replace(/\\n/g, '\n')
}

const getLanguageId = lang => {
  const map = {
    cpp: 54,
    c: 50,
    java: 62,
    python: 71
  }
  return map[lang] || 71
}

export default function CodeView ({
  setCurrProblem,
  totalQuestion,
  currProblem,
  submittedProblems,
  problem,
  currSetting,
  setCurrentSection,
  setSubmittedProblems,
  handleCodeChange,
  handleLanguageChange
}) {
  const { user } = useSelector(s => s.auth)
  const { id: testId } = useParams()
  const [language, setLanguage] = useState(currSetting[currProblem].language)
  const [code, setCode] = useState(currSetting[currProblem].code)
  const [isExecuting, setIsExecuting] = useState(false)
  const [summary, setSummary] = useState()
  const [testResults, setTestResults] = useState([])
  const [showOutputWindow, setShowOutputWindow] = useState(false)
  const [codeReview, setCodeReview] = useState()
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  useEffect(() => {
    if (submittedProblems.includes(currProblem)) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [currProblem, submittedProblems])

  useEffect(() => {
    const setting = currSetting[currProblem]
    setLanguage(setting.language)
    setCode(setting.code)
  }, [currProblem, currSetting])

  const handleEditorChange = newValue => {
    setCode(newValue)
    handleCodeChange(currProblem, newValue)
  }

  const handleLanguageSelect = event => {
    const newLanguage = event.target.value
    const confirmChange = window.confirm(
      'Changing the language might reset your code. Proceed?'
    )
    if (confirmChange) {
      setLanguage(newLanguage)
      handleLanguageChange(currProblem, newLanguage)
    }
  }

  const runTestCases = async () => {
    setShowOutputWindow(true)
    setTestResults([])
    setSummary([])
    setCodeReview()
    await runCodeBatch({
      code,
      language,
      testCases: problem.testCases,
      setIsExecuting,
      setSummary,
      setTestResults,
      headers,
      CODE_EXECUTION_API,
      getLanguageId
    })
    await geminiReview({
      setCodeReview: setCodeReview,
      code,
      problemName: problem.title
    })
  }

  const submitCode = async () => {
    setShowOutputWindow(true)
    setShowConfirmModal(false)
    setTestResults([])
    setSummary([])
    setCodeReview([])
    try {
      await runCodeBatch({
        code,
        language,
        testCases: problem.testCases,
        setIsExecuting,
        setSummary,
        setTestResults,
        headers,
        CODE_EXECUTION_API,
        getLanguageId
      })
      await geminiReview({
        setCodeReview: setCodeReview,
        code,
        problemName: problem.title
      })
      const res = await axios.post(`${BASE_URL}/api/v3/review/submit`, {
        userId: user._id,
        testId,
        problemId: problem._id,
        language,
        sourceCode: code,
        codeReview: codeReview,
        passedTestCases: summary?.passed || 0,
        totalTestCases: summary?.total || 0,
        executionTime: summary?.avgTime,
        memoryUsed: summary?.avgMemory
      })
      setSubmittedProblems(prev => [
        ...prev,
        { pNo: currProblem, id: res.data.submissionId }
      ])
      setTimeout(() => {
        setShowOutputWindow(false)
        setCurrProblem(prev => (prev + 1) % totalQuestion)
      }, 3000)
    } catch (submitErr) {
      console.error('Submission API error:', submitErr)
    }
  }

  if (!problem) return <p className='p-5 text-red-500'>Problem not found</p>

  return (
    <>
      <section className='p-5  h-[calc(100vh-60px-52px)]  overflow-x-hidden overflow-y-hidden left-0  relative flex w-[calc(100vw-70px)]'>
        <div className='flex-[0.6] relative min-w-[200px] custom-scrollbar overflow-y-hidden'>
          <div className='flex-[0.4] overflow-y-scroll h-full p-4 space-y-4 text-sm'>
            <h1 className='text-2xl font-bold'>{problem.title}</h1>

            <div>
              <h2 className='text-lg font-semibold'>Description</h2>
              <p className='text-gray-700 whitespace-pre-line'>
                {problem.description}
              </p>
            </div>

            {problem.constraints && (
              <div>
                <h2 className='text-lg font-semibold'>Constraints</h2>
                <ul className='list-disc list-inside text-gray-600'>
                  {problem.constraints.map((constraint, i) => (
                    <li key={i}>{constraint}</li>
                  ))}
                </ul>
              </div>
            )}

            {problem.topics && (
              <div>
                <h2 className='text-lg font-semibold'>Topics</h2>
                <div className='flex flex-wrap gap-2'>
                  {problem.topics.map((topic, i) => (
                    <span
                      key={i}
                      className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded'
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {problem.hints && (
              <div>
                <h2 className='text-lg font-semibold'>Hints</h2>
                <ul className='list-disc list-inside text-gray-600'>
                  {problem.hints.map((hint, i) => (
                    <li key={i}>{hint}</li>
                  ))}
                </ul>
              </div>
            )}

            {problem.sampleTestCases && (
              <div>
                <h2 className='text-lg font-semibold'>Sample Test Cases</h2>
                {problem.sampleTestCases.map((test, i) => (
                  <div key={i} className='mb-2 p-2 bg-gray-100 rounded'>
                    <p>
                      <strong>Input:</strong> {test.input}
                    </p>
                    <p>
                      <strong>Output:</strong> {test.output}
                    </p>
                    <p>
                      <strong>Explanation:</strong> {test.explanation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            className={`absolute w-full h-[] top-0 transition-all duration-300 ease-linear  ${
              showOutputWindow ? 'top-0' : 'top-[100vh] invisible '
            }`}
          >
            {showOutputWindow && (
              <>
                <CodeOutputWindow
                  codeReview={codeReview}
                  setShowOutputWindow={setShowOutputWindow}
                  testResults={testResults}
                  summary={summary}
                />
              </>
            )}
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <hr className='bg-gray-300  flex-1 w-[2px]' />
          <div className='hover:bg-blue-500 hover:text-white cursor-grab bg-gray-300 h-[25px] w-[25px] flex items-center  rounded-full'>
            <NavigateBefore sx={{ marginRight: '-3px' }} fontSize='12' />
            <NavigateNext sx={{ marginLeft: '-3px' }} fontSize='12' />
          </div>
          <hr className='bg-gray-300 flex-1 w-[2px]' />
        </div>
        <div className='mb-10 relative flex-1'>
          {submittedProblems.some(problem => problem.pNo === currProblem) && (
            <div className='absolute h-full w-full inset-0  bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-10'>
              <div className='bg-white text-black p-6 rounded shadow-lg text-center'>
                <h2 className='text-lg font-semibold mb-2'>
                  Submission Notice
                </h2>
                <p>You have already submitted this problem.</p>
              </div>
            </div>
          )}
          <div className='bg-gray-50 flex justify-between p-5 mx-5 rounded-t-lg'>
            <div className='flex flex-col  ml-1'>
              <label className='text-xs mb-1'>Choose language</label>
              <select
                value={language}
                onChange={handleLanguageSelect}
                className='custominput'
              >
                <option value='cpp'>C++</option>
                <option value='c'>C</option>
                <option value='java'>Java</option>
                <option value='python'>Python</option>
              </select>
            </div>
            <div className='flex justify-end flex-1 items-center gap-2'>
              <button
                onClick={runTestCases}
                className='rounded-md border border-slate-300 py-2 px-4 text-sm transition-all shadow-sm hover:shadow-lg text-white bg-slate-800 disabled:opacity-50'
                type='button'
                disabled={isExecuting}
              >
                {isExecuting ? 'Running...' : 'Run Code'}
              </button>
              <button
                onClick={() => setShowConfirmModal(true)}
                className='rounded-md border border-slate-300 py-2 px-4 text-sm transition-all shadow-sm hover:shadow-lg text-white bg-slate-800'
                type='button'
              >
                Submit
              </button>
            </div>
          </div>
          <div className='bg-gray-50 shadow-lg border mx-5 custom-scrollbar'>
            <Editor
              height='550px'
              language={language}
              value={code}
              onChange={handleEditorChange}
              options={{
                theme: 'light',
                minimap: { enabled: false },
                fontSize: 14
              }}
            />
          </div>
        </div>
        <Modal
          open={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          aria-labelledby='submit-confirm-title'
          aria-describedby='submit-confirm-description'
        >
          <Box
            className='absolute bg-white p-6 rounded-md shadow-lg'
            sx={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 600
            }}
          >
            <Typography
              id='submit-confirm-title'
              variant='h6'
              component='h2'
              className='mb-4'
            >
              Confirm Submission
            </Typography>
            <Typography
              id='submit-confirm-description'
              className='mb-4 text-sm text-gray-700'
            >
              Are you sure you want to submit your code ? You won't be able to
              change your solution later.
            </Typography>
            <div className='flex justify-end gap-2 mt-4'>
              <Button
                onClick={() => setShowConfirmModal(false)}
                variant='outlined'
              >
                Cancel
              </Button>
              <Button onClick={submitCode} variant='contained' color='primary'>
                Confirm
              </Button>
            </div>
          </Box>
        </Modal>
      </section>
    </>
  )
}
