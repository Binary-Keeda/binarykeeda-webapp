import React, { useState, useEffect } from 'react'
import { Editor } from '@monaco-editor/react'
import axios from 'axios'
import { BASE_URL, CODE_EXECUTION_API, headers } from '../../../lib/config'
import { IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'
import CodeSubmitWindow from './CodeSubmitWindow'

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
  currProblem,
  submittedProblems,
  problem,
  currSetting,
  setCurrentSection,
  setSubmittedProblems,
  handleCodeChange,
  handleLanguageChange
}) {
  const [language, setLanguage] = useState(currSetting[currProblem].language)
  const [code, setCode] = useState(currSetting[currProblem].code)
  const [isExecuting, setIsExecuting] = useState(false)
  const [testResults, setTestResults] = useState([])
  const [showWindow, setShowSubmitWindow] = useState()
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
    setTestResults([]) // reset on problem switch
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

  const fetchResult = async token => {
    for (let i = 0; i < 10; i++) {
      try {
        const res = await axios.get(
          `${CODE_EXECUTION_API}/submissions/${token}?base64_encoded=false`,
          { headers }
        )
        const data = res.data
        if ([3, 4, 6, 11].includes(data.status?.id)) {
          return data
        }
        await new Promise(r => setTimeout(r, 2000))
      } catch {
        return { stderr: 'Failed to fetch result.' }
      }
    }
    return { stderr: 'Timed out.' }
  }

  const runCode = async () => {
    setIsExecuting(true)
    const results = []

    for (const test of problem.sampleTestCases) {
      try {
        const res = await axios.post(
          `${CODE_EXECUTION_API}/submissions?base64_encoded=false`,
          {
            source_code: code,
            language_id: getLanguageId(language),
            stdin: test.input,
            cpu_time_limit: 5,
            memory_limit: 128000
          },
          { headers }
        )

        const token = res.data.token
        const output = await fetchResult(token)
        const decodedOutput = output?.stdout ? output.stdout.trim() : ''
        const expectedOutput = test.output.trim()

        results.push({
          input: test.input,
          output: decodedOutput,
          expected: expectedOutput,
          passed: decodedOutput === expectedOutput,
          error: output.stderr || null
        })
      } catch (err) {
        console.error('Test case error:', err)
        results.push({
          input: test.input,
          output: '',
          expected: test.output,
          passed: false,
          error: 'Execution failed'
        })
      }
    }

    setTestResults(results)
    setIsExecuting(false)
  }

  const submitCode = () => {
    const submission = {
      problemId: problem.id,
      code,
      language
    }

    const isConfirmed = window.confirm(
      'Are you sure you want to submit the code?'
    )

    if (isConfirmed) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setShowSubmitWindow(true)
    } else {
    }
  }

  if (!problem) return <p className='p-5 text-red-500'>Problem not found</p>

  return (
    <>
      {submittedProblems.some(problem => problem.pNo === currProblem) && (
        <div className='fixed inset-0 top-[140px] bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-40'>
          <div className='bg-white text-black p-6 rounded shadow-lg text-center'>
            <h2 className='text-lg font-semibold mb-2'>Submission Notice</h2>
            <p>You have already submitted this problem.</p>
          </div>
        </div>
      )}

      <section className='p-5'>
        <div>
          <p className='text-lg font-semibold'>
            <strong>Problem:</strong> {problem.title}
          </p>
          <p className='mb-4'>
            <strong>Description:</strong> {problem.description}
          </p>

          <div>
            <p className='text-lg font-semibold mb-2'>Example</p>
            {problem.sampleTestCases.map((test, idx) => {
              const result = testResults[idx]
              return (
                <div key={idx} className='mb-6 border rounded p-4 bg-gray-50'>
                  <div className='mb-2 flex justify-between items-center'>
                    <strong>Test Case #{idx + 1}</strong>
                    {result && (
                      <span
                        className={`font-semibold ${
                          result.passed ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {result.passed ? '✅ Passed' : '❌ Failed'}
                      </span>
                    )}
                  </div>

                  <div className='mb-2'>
                    <strong>Input:</strong>
                    <pre className='bg-white p-2 border rounded whitespace-pre-wrap'>
                      {formatEscapedNewlines(test.input)}
                    </pre>
                  </div>

                  <div className='mb-2'>
                    <strong>Expected Output:</strong>
                    <pre className='bg-white p-2 border rounded whitespace-pre-wrap'>
                      {test.output}
                    </pre>
                  </div>

                  {result && (
                    <>
                      <div className='mb-2'>
                        <strong>Your Output:</strong>
                        <pre className='bg-white p-2 border rounded whitespace-pre-wrap'>
                          {result.output || 'No output'}
                        </pre>
                      </div>

                      {result.error && (
                        <div className='text-red-500'>
                          <strong>Error:</strong> {result.error}
                        </div>
                      )}
                    </>
                  )}

                  <div>
                    <strong>Explanation:</strong>
                    <p className='mt-1'>{test.explanation}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div className='mb-10'>
        <div className='bg-gray-50 flex justify-between p-5 mx-5 rounded-t-lg'>
          <div className='flex flex-col w-[100px] ml-1'>
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
              onClick={runCode}
              className='rounded-md border border-slate-300 py-2 px-4 text-sm transition-all shadow-sm hover:shadow-lg text-white bg-slate-800 disabled:opacity-50'
              type='button'
              disabled={isExecuting}
            >
              {isExecuting ? 'Running...' : 'Run Code'}
            </button>
            <button
              onClick={submitCode}
              className='rounded-md border border-slate-300 py-2 px-4 text-sm transition-all shadow-sm hover:shadow-lg text-white bg-slate-800'
              type='button'
            >
              Submit
            </button>
          </div>
        </div>
        <div className='bg-gray-50 shadow-lg border mx-5 custom-scrollbar'>
          <Editor
            height='400px'
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

      {(isExecuting || testResults.length > 0) && (
        <SampleTestCaseWindow
          isExecuting={isExecuting}
          testResults={testResults}
          data={problem?.sampleTestCases}
        />
      )}

      {showWindow && (
        <CodeSubmitWindow
          problemId={problem._id}
          setShowSubmitWindow={setShowSubmitWindow}
          code={code}
          language={language}
          testCases={problem.testCases}
          getLanguageId={getLanguageId}
          fetchResult={fetchResult}
          currProblem={currProblem}
          setSubmittedProblems={setSubmittedProblems}
        />
      )}
    </>
  )
}

const SampleTestCaseWindow = ({ isExecuting, code, data, testResults }) => {
  return (
    <div className='grid grid-cols-4 gap-3 mx-5 w-full'>
      {data?.map((test, idx) => {
        const result = testResults[idx]
        return (
          <div key={idx} className='mb-6 border rounded p-4 bg-gray-50'>
            {isExecuting ? (
              <div className='flex justify-center'>
                {' '}
                <div className='loader3'></div>
              </div>
            ) : (
              <>
                <div className='mb-2 flex justify- items-center'>
                  <strong>Test Case #{idx + 1}</strong>

                  {result && (
                    <span
                      className={`font-semibold ${
                        result.passed ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {result.passed ? '✅ Passed' : '❌ Failed'}
                    </span>
                  )}
                </div>

                <div className='mb-2'>
                  <strong>Input:</strong>
                  <pre className='bg-white p-2 border rounded whitespace-pre-wrap'>
                    {formatEscapedNewlines(test.input)}
                  </pre>
                </div>

                <div className='mb-2'>
                  <strong>Expected Output:</strong>
                  <pre className='bg-white p-2 border rounded whitespace-pre-wrap'>
                    {test.output}
                  </pre>
                </div>

                {result && (
                  <>
                    <div className='mb-2'>
                      <strong>Your Output:</strong>
                      <pre className='bg-white p-2 border rounded whitespace-pre-wrap'>
                        {result.output || 'No output'}
                      </pre>
                    </div>

                    {result.error && (
                      <div className='text-red-500'>
                        <strong>Error:</strong> {result.error}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}
