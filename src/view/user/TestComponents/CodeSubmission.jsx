import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'
import { BASE_URL, CODE_EXECUTION_API, headers } from '../../../lib/config'

const CodeSubmitWindow = ({
  setShowSubmitWindow,
  setCurrProblem,
  setSubmittedProblems,
  problemName,
  code,
  currProblem,
  testCases,
  language,
  fetchResult,
  problemId,
  getLanguageId
}) => {
  const [codeReview, setCodeReview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isExecuting, setIsExecuting] = useState(false)
  const [testResults, setTestResults] = useState([])

  const { user } = useSelector(state => state.auth)
  const { id: testId } = useParams()

  const runCode = async () => {
    setIsExecuting(true)
    const results = []
    let passedCount = 0
    let totalTime = 0
    let totalMemory = 0

    for (const test of testCases) {
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

        const decodedOutput = output?.stdout?.trim() || ''
        const expectedOutput = test.output.trim()
        const passed = decodedOutput === expectedOutput

        if (passed) passedCount++
        totalTime += parseFloat(output.time || 0)
        totalMemory += parseInt(output.memory || 0)

        results.push({
          input: test.input,
          output: decodedOutput,
          expected: expectedOutput,
          passed,
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

    const averageTime = totalTime / testCases.length
    const averageMemory = totalMemory / testCases.length

    try {
      const res = await axios.post(`${BASE_URL}/api/v3/review/submit`, {
        userId: user._id,
        testId,
        problemId: currProblem._id,
        language,
        sourceCode: code,
        codeReview: codeReview, 
        passedTestCases: passedCount,
        totalTestCases: testCases.length,
        executionTime: averageTime,
        memoryUsed: averageMemory,
        problemId
      })
      setSubmittedProblems(prev => [...prev, {pNo:currProblem, id:res.data.submissionId}]);
      setCurrP
    } catch (submitErr) {
      console.error('Submission API error:', submitErr)
    }

    setTestResults(results)
    setIsExecuting(false)
  }

  const geminiReview = () => {
    setLoading(true)
    axios
      .post(`${BASE_URL}/api/v3/review/code`, { sourceCode: code , problem:problemName})
      .then(res => {
        const parsed = cleanGeminiResponse(res.data.data)
        console.log(parsed)
        setCodeReview(parsed)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }

  function cleanGeminiResponse (data) {
    if (!data) return null
  
    const cleaned = data.replace(/```json\n?/, '').replace(/```$/, '')
  
    try {
      return JSON.parse(cleaned)
    } catch (error) {
      console.error('Failed to parse cleaned JSON:', error)
      return null
    }
  }
  

  useEffect(() => {
    if(!codeReview) {
      geminiReview()
    }else{
      runCode()
    }
  }, [codeReview])



  const renderMetric = (label, value, threshold = 6) => {
    const isGood = value >= 1
    return (
      <div
        className={`flex justify-between items-center px-4 py-2 rounded text-sm font-medium ${
          isGood ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}
      >
        <span>{label}</span>
        <span>{value} {isGood ? 'Passed' : 'Failed'}</span>
      </div>
    )
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 overflow-auto'>
      <div className='bg-white relative text-black p-6 rounded-xl shadow-2xl w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto space-y-6'>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl font-bold'>Code Submission Report</h2>
          <IconButton onClick={() => setShowSubmitWindow(false)} size='small'>
            <Close />
          </IconButton>
        </div>

        {(loading || isExecuting) ? (
          <div className='flex justify-center py-6'>
            <div className='loader3'></div>
          </div>
        ) : (
          <>
            {/* ✅ Test Case Results */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold'>Test Case Results</h3>
              {testResults.map((res, idx) => (
                <div key={idx} className={`border-l-4 p-4 rounded shadow-sm ${res.passed ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                  <p><strong>Input:</strong> <pre className='inline'>{res.input}</pre></p>
                  <p><strong>Expected:</strong> <pre className='inline'>{res.expected}</pre></p>
                  <p><strong>Your Output:</strong> <pre className='inline'>{res.output}</pre></p>
                  <p className='mt-1 text-sm font-semibold'>
                    Result: {res.passed ? <span className='text-green-700'>✅ Passed</span> : <span className='text-red-700'>❌ Failed</span>}
                  </p>
                  {res.error && <p className='text-xs text-red-500 mt-1'>Error: {res.error}</p>}
                </div>
              ))}
            </div>

            {/* ✅ Gemini Code Review */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold'>Gemini Code Review</h3>
              {codeReview ? (
                <div className='space-y-2'>
                  {renderMetric('Indentation', codeReview.indentation)}
                  {renderMetric('Modularity', codeReview.modularity)}
                  {renderMetric('Variable Naming', codeReview.variable_name_convention)}
                  {renderMetric('Time Complexity', codeReview.time_complexity)}
                  {renderMetric('Space Complexity', codeReview.space_complexity)}
                  {renderMetric('Final' , codeReview.finalScore)}
                </div>
              ) : (
                <div className='text-gray-500 text-sm'>
                  Code review not available.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CodeSubmitWindow