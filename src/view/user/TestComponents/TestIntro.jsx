// // import React, { useEffect, useState } from 'react'
// // import sample from './sample.json'
// // import QuizInterface from './QuizInterface'
// // import { Divider, IconButton } from '@mui/material'
// // import { ExitToApp, Fullscreen, Help } from '@mui/icons-material'
// // import { Link } from 'react-router-dom'
// // import axios from 'axios'
// // import { BASE_URL } from '../../../lib/config'
// // export default function TestIntro ({ id }) {
// //   // fetch test & its sections
// //   const [testSubmission,setTestSubmission] = useState();
// //   const [timeLeft, setTimeLeft] = useState(testSubmission?.createdAt)
// //   const [test,setTest] = useState();
// //   const [currentSection, setCurrentSection] = useState(0);
// //   const changeQuizPage = () => {}

// //   useEffect(() => {
// //     axios
// //       .get(
// //         BASE_URL +
// //           '/api/v2/test/submission?userId=67e763601249569ae0e47ccb&testId=67ea77d2154bf8601ff1b1f4'
// //       )
// //       .then(response => {
// //         console.log(response.data)
// //         setTestSubmission(response.data.testSubmission);
// //         setTest(response.data.test);

// //       })
// //       .catch(error => {
// //         console.error(error)
// //       })
// //   }, [])
// //      useEffect(() => {
// //         if (test && testSubmission) {
// //           const startTime = new Date(testSubmission.createdAt).getTime()
// //           const quizEndTime = startTime + test.duration * 60 * 1000
// //           const interval = setInterval(() => {
// //             const remainingTime = quizEndTime - Date.now()
// //             setTimeLeft(Math.max(remainingTime, 0))
// //             if (remainingTime <= 0) {
// //               clearInterval(interval) // Stop the timer if time is up
// //               submitHandler()
// //             }
// //           }, 1000)
// //           return () => clearInterval(interval)
// //         }
// //       }, [testSubmission, test])
// //   return (
// //     <>
// //       <header className='flex gap-8 relative h-[70px] items-center left-0 shadow-sm w-full p-4'>
// //         <nav className='flex gap-8 fixed h-[70px] z-20 justify-between bg-white left-0 top-0 items-center  shadow-sm w-full p-4'>
// //           <div className='flex items-center gap-5'>
// //             <img
// //               src='/assets/logo/F1948A99-E208-45B2-A79C-D1E5FCE620AA_4_5005_c.jpeg'
// //               className='h-12'
// //               alt=''
// //             />
// //           </div>

// //           <div className='flex gap-5'>
// //             {true ? (
// //               <div className='flex gap-4 items-center px-3 p-1 bg-white text-gray-900 rounded-2xl shadow-md transition-all transform'>
// //                 <div className='flex items-center gap-2 text-md font-semibold'>
// //                   <span className='text-lg animate-pulse'>⏳</span>
// //                   {Math.floor(timeLeft / 60000)}m
// //                 </div>
// //                 <Divider
// //                   orientation='vertical'
// //                   flexItem
// //                   className='border-gray-300'
// //                 />
// //                 <div className='flex items-center gap-2 text-md font-semibold'>
// //                   <span className='text-lg animate-pulse'>⏱️</span>
// //                   {Math.floor((timeLeft % 60000) / 1000)}s
// //                 </div>
// //               </div>
// //             ) : (
// //               <>
// //                 <span>Times Up : Redirecting ...</span>
// //                 <span className='bg-black backdrop-blur-md z-50 fixed h-screen w-screen top-0 left-0 bg-opacity-5 flex flex-col justify-center items-center'>
// //                   <div class='border-gray-300 h-10 w-10 animate-spin rounded-full border-2 border-t-blue-600' />
// //                   <p className='text-gray-900 text-sm mt-1'>
// //                     Please wait while we are loading your quiz
// //                   </p>
// //                 </span>
// //               </>
// //             )}
// //           </div>

// //           <div className='flex gap-5 items-center'>
// //             <div className='flex gap-4'>
// //               {test?.sections?.map((item, index) => (
// //                   <div
// //                   onClick={() => {setCurrentSection(index)}}
// //                     className={`cursor-pointer ${
// //                       index == currentSection ? 'bg-green-600' : 'bg-orange-500'
// //                     } text-white border px-4 py-1 text-sm `}
// //                     key={index}
// //                   >
// //                     {item.name}
// //                   </div>
// //               ))}
// //             </div>
// //           </div>
// //         </nav>
// //       </header>
// //       {
// //         <QuizInterface currentQuiz={test?.sections[currentSection].questionSet} />
// //       }
// //     </>
// //   )
// // }

// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import QuizInterface from './QuizInterface'
// import { Divider } from '@mui/material'
// import { BASE_URL } from '../../../lib/config'

// export default function TestIntro({ userId, testId }) {
//   const [testSubmission, setTestSubmission] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [test, setTest] = useState(null);
//   const [currentSection, setCurrentSection] = useState(0);

//   useEffect(() => {
//     axios.get(`${BASE_URL}/api/v2/test/submission?userId=67e763601249569ae0e47ccb&testId=67ea77d2154bf8601ff1b1f4`)
//       .then(response => {
//         console.log(response.data);
//         setTestSubmission(response.data.testSubmission);
//         setTest(response.data.test);
//       })
//       .catch(error => {
//         console.error("Failed to fetch test data:", error);
//       });
//   }, [userId, testId]);

//   useEffect(() => {
//     if (test && testSubmission) {
//       const startTime = new Date(testSubmission.createdAt).getTime();
//       const quizEndTime = startTime + test.duration * 60 * 1000;

//       const interval = setInterval(() => {
//         const remainingTime = quizEndTime - Date.now();
//         setTimeLeft(Math.max(remainingTime, 0));

//         if (remainingTime <= 0) {
//           clearInterval(interval);
//           handleSubmit();
//         }
//       }, 1000);

//       return () => clearInterval(interval);
//     }
//   }, [testSubmission, test]);

//   const handleSubmit = () => {
//     console.log("Time's up! Submitting test...");
//     // Implement test submission logic here
//   };

//   return (
//     <>
//       <header className="flex gap-8 relative h-[70px] items-center left-0 shadow-sm w-full p-4">
//         <nav className="flex gap-8 fixed h-[70px] z-20 justify-between bg-white left-0 top-0 items-center shadow-sm w-full p-4">
//           <div className="flex items-center gap-5">
//             <img src="/assets/logo/logo.jpeg" className="h-12" alt="Logo" />
//           </div>

//           <div className="flex gap-5">
//             {timeLeft > 0 ? (
//               <div className="flex gap-4 items-center px-3 p-1 bg-white text-gray-900 rounded-2xl shadow-md">
//                 <div className="flex items-center gap-2 text-md font-semibold">
//                   <span className="text-lg animate-pulse">⏳</span>
//                   {Math.floor(timeLeft / 60000)}m
//                 </div>
//                 <Divider orientation="vertical" flexItem className="border-gray-300" />
//                 <div className="flex items-center gap-2 text-md font-semibold">
//                   <span className="text-lg animate-pulse">⏱️</span>
//                   {Math.floor((timeLeft % 60000) / 1000)}s
//                 </div>
//               </div>
//             ) : (
//               <span className="text-red-500 font-bold">Time's Up! Submitting...</span>
//             )}
//           </div>

//           <div className="flex gap-5 items-center">
//             {test?.sections?.map((item, index) => (
//               <div
//                 key={index}
//                 onClick={() => setCurrentSection(index)}
//                 className={`cursor-pointer px-4 py-1 text-sm text-white border ${
//                   index === currentSection ? 'bg-green-600' : 'bg-orange-500'
//                 }`}
//               >
//                 {item.name}
//               </div>
//             ))}
//           </div>
//         </nav>
//       </header>

//       {test?.sections?.[currentSection]?.questionSet ? (
//         <QuizInterface questionSet={test.sections[currentSection].questionSet} />
//       ) : (
//         <p className="text-center mt-10 text-gray-500">Loading quiz...</p>
//       )}
//     </>
//   );
// }
import React, { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../../lib/config'
export default function TestIntro ({
  testId,
  userId,
  setHashAgreed,
  setTest,
  submissionId
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
        .then(data => setHashAgreed(true))
        
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
