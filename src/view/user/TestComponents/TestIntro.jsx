import React, { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../../lib/config'
export default function TestIntro ({
  testId,
  userId,
  setHashAgreed,
  setTest,
  submissionId,
  setTestSubmission
}) {
  const [agreed, setAgreed] = useState(false)

  const handleCheckboxChange = () => {
    setAgreed(!agreed)
  }

  const handleStartTest = () => {
    if (agreed) {
      axios
        .post(
          `${BASE_URL}/api/v2/test/start/${submissionId}`,
          {},
          { withCredentials: true }
        )
        .then((data) => {setTestSubmission(data.data?.testSubmission) ;setHashAgreed(true)})
        
    }
  }

  return (
    <div className='max-w-4xl mx-auto p-8 bg-white border border-gray-200 rounded-lg shadow-lg'>
      <h2 className='text-3xl font-extrabold text-center text-gray-800 mb-6'>
        Online Assessment Rules
      </h2>

      <div className='space-y-6'>
        <p className='text-sm text-gray-600 mb-4'>
          Before you start the assessment, please read the following rules
          carefully. By proceeding with the test, you agree to abide by these
          terms.
        </p>

        <div>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>
            {' '}
            General Rules:
          </h3>
          <ul className='list-inside list-disc space-y-2 text-gray-600 text-sm'>
            <li>
              You must complete the test <strong>in a single sitting</strong>.
            </li>
            <li>
              Ensure a <strong>stable internet connection</strong> throughout
              the test.
            </li>
            <li>
              <strong>
                Do not refresh, close, or switch browser tabs/windows
              </strong>{' '}
              — such actions will be{' '}
              <strong>tracked and may lead to disqualification</strong>.
            </li>
            <li>
              Use of external devices, browsers, or tools (e.g., chat apps,
              online compilers) is <strong>strictly prohibited</strong>.
            </li>
            <li>
              Your <strong>camera and screen activity may be monitored</strong>,
              if proctoring is enabled.
            </li>
            <li>
              Any form of <strong>malpractice or suspicious activity</strong>{' '}
              will result in{' '}
              <strong>automatic submission and invalidation</strong> of your
              test.
            </li>
          </ul>
        </div>

        <div>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>
            Coding Section:
          </h3>
          <ul className='list-inside list-disc space-y-2 text-gray-600 text-sm'>
            <li>
              You will be given <strong>coding problems</strong> that must be
              solved using the in-browser code editor.
            </li>
            <li>
              Your code will be <strong>auto-evaluated</strong> against multiple
              test cases.
            </li>
            <li>
              Use only the <strong>allowed programming languages</strong>{' '}
              specified on the test page.
            </li>
            <li>
              You may <strong>not copy-paste</strong> code from external
              sources.
            </li>
          </ul>
        </div>

        <div>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>
            Quiz Section:
          </h3>
          <ul className='list-inside list-disc space-y-2 text-gray-600 text-sm'>
            <li>
              The quiz consists of{' '}
              <strong>objective-type questions (MCQs)</strong>.
            </li>
            <li>
              Each question is <strong>mandatory</strong> and carries equal
              weight.
            </li>
            <li>No negative marking unless explicitly mentioned.</li>
            <li>
              Once you move to the next question,{' '}
              <strong>you cannot go back</strong> (if backward navigation is
              disabled).
            </li>
          </ul>
        </div>

        <div>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>
            Violations:
          </h3>
          <ul className='list-inside list-disc space-y-2 text-gray-600 text-sm'>
            <li>
              Browser/tab switch or screen resize will be{' '}
              <strong>recorded as a violation</strong>.
            </li>
            <li>
              Multiple violations may lead to <strong>test termination</strong>.
            </li>
            <li>
              All activities are <strong>logged for post-analysis</strong>.
            </li>
          </ul>
        </div>

        <div className='flex items-center space-x-3 mt-6'>
          <input
            type='checkbox'
            checked={agreed}
            onChange={handleCheckboxChange}
          />
          <span className='text-sm text-gray-700'>
            I have read and understood the rules and regulations. I agree to
            abide by them during the test.
          </span>
        </div>

        <div className='mt-6 text-center'>
          <button
            onClick={handleStartTest}
            disabled={!agreed}
            className={`py-3 px-6 rounded-lg text-white font-semibold transition-colors duration-300 ${
              agreed
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  )
}
