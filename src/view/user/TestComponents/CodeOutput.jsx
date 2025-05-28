import { IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'

export default function CodeOutputWindow ({
  setShowOutputWindow,
  codeReview,
  testResults,
  summary,
  isExecuting
}) {
  const renderMetric = (label, value, threshold = 6) => {
    const isGood = value >= 1
    return (
      <div
        className={`flex justify-between items-center px-4 py-2 rounded text-sm font-medium ${
          isGood ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}
      >
        <span>{label}</span>
        <span>{isGood ? 'Passed' : 'Failed'}</span>
      </div>
    )
  }

  return (
    <div className='absolute w-full left-0'>
      <div className='bg-white min-h-[calc(100vh-52px-60px)] relative text-black p-6 rounded-3xl shadow-2xl w-[100%] max-w-3xl max-h-[90vh] overflow-y-auto space-y-6'>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl font-bold'>Output Window</h2>
          <IconButton onClick={() => setShowOutputWindow(false)} size='small'>
            <Close />
          </IconButton>
        </div>

        {isExecuting || testResults.length == 0? (
          <div className='flex justify-center py-6'>
            {/* <div className='loader3'></div> */}
            <div className='h-full w-full flex justify-center pt-5'>
              <div className='spinner'></div>
            </div>
          </div>
        ) : (
          <>
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold'>
                Test Case Results{' '}
                <span className='text-sm font-normal text-gray-600'>
                 ({summary?.passed}/{parseInt(summary?.passed) + parseInt(summary?.failed)} Passed)

                </span>
              </h3>
              {testResults.slice(0, 2).map((res, idx) => (
                <div
                  key={idx}
                  className={`border-l-4 p-4 rounded shadow-sm ${
                    res.passed
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                  }`}
                >
                  <p>
                    <strong>Input:</strong>{' '}
                    <pre className='inline'>{res.input}</pre>
                  </p>
                  <p>
                    <strong>Expected:</strong>{' '}
                    <pre className='inline'>{res.expected}</pre>
                  </p>
                  <p>
                    <strong>Your Output:</strong>{' '}
                    <pre className='inline'>{res.output}</pre>
                  </p>
                  <p className='mt-1 text-sm font-semibold'>
                    Result:{' '}
                    {res.passed ? (
                      <span className='text-green-700'>✅ Passed</span>
                    ) : (
                      <span className='text-red-700'>❌ Failed</span>
                    )}
                  </p>
                  {res.error && (
                    <p className='text-xs text-red-500 mt-1'>
                      Error: {res.error}
                    </p>
                  )}
                </div>
              ))}
              {testResults.length > 2 && (
                <div className='text-sm text-gray-500 italic'>
                  Only first 2 test cases are shown.
                </div>
              )}
            </div>

            <div className='space-y-4'>
              <h3 className='text-lg font-semibold'>AI Code Review</h3>
              {codeReview ? (
                <div className='space-y-2'>
                  {renderMetric('Indentation', codeReview.indentation)}
                  {renderMetric('Modularity', codeReview.modularity)}
                  {renderMetric(
                    'Variable Naming',
                    codeReview.variable_name_convention
                  )}
                  {renderMetric('Time Complexity', codeReview.time_complexity)}
                  {renderMetric(
                    'Space Complexity',
                    codeReview.space_complexity
                  )}
                  {renderMetric('Final', codeReview.finalScore)}
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
