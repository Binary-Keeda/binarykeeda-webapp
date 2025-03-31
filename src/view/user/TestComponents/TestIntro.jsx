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

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import QuizInterface from './QuizInterface'
import { Divider } from '@mui/material'
import { BASE_URL } from '../../../lib/config'
import {useSelector} from 'react-redux'
export default function TestIntro ({ userId, testId }) {
  const [testSubmission, setTestSubmission] = useState(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [test, setTest] = useState(null)
  const [currentSection, setCurrentSection] = useState(0)
  const {user} = useSelector(s=>s.auth);
  // Fetch Test & Test Submission Data
  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/api/v2/test/submission?userId=${user._id}&testId=67ea77d2154bf8601ff1b1f4`
      )
      .then(response => {
        console.log('Fetched Test Data:', response.data)
        setTestSubmission(response.data.testSubmission)
        setTest(response.data.test)
        
      })
      .catch(error => {
        console.error('Failed to fetch test data:', error)
      })
  }, [userId, testId])

  // Set Timer for Quiz
     useEffect(() => {
        if (test && testSubmission) {
          const startTime = new Date(testSubmission.createdAt).getTime();
          const quizEndTime = startTime + test.duration * 60 * 1000;
    
          const interval = setInterval(() => {
            const remainingTime = quizEndTime - Date.now();
            setTimeLeft(Math.max(remainingTime, 0));
    
            if (remainingTime <= 0) {
              clearInterval(interval);
              handleSubmit();
            }
          }, 1000);
    
          return () => clearInterval(interval);
        }
      }, [testSubmission, test]);
    

  // Ensure `sections` exist before setting the default section
  useEffect(() => {
    if (test?.sections?.length > 0) {
      setCurrentSection(0)
    }
  }, [test])

  const handleSubmit = () => {
    console.log("Time's up! Submitting test...")
    // Implement test submission logic here
  }

  return (
    <>
      <header className='flex gap-8 relative h-[70px] items-center left-0 shadow-sm w-full p-4'>
        <nav className='flex gap-8 fixed h-[70px] z-20 justify-between bg-white left-0 top-0 items-center shadow-sm w-full p-4'>
          <div className='flex items-center gap-5'>
            <img src='/assets/logo/F1948A99-E208-45B2-A79C-D1E5FCE620AA_4_5005_c.jpeg' className='h-12' alt='Logo' />
          </div>

          <div className='flex gap-5'>
            {timeLeft > 0 ? (
              <div className='flex gap-4 items-center px-3 p-1 bg-white text-gray-900 rounded-2xl shadow-md'>
                <div className='flex items-center gap-2 text-md font-semibold'>
                  <span className='text-lg animate-pulse'>⏳</span>
                  {Math.floor(timeLeft / 60000)}m
                </div>
                <Divider
                  orientation='vertical'
                  flexItem
                  className='border-gray-300'
                />
                <div className='flex items-center gap-2 text-md font-semibold'>
                  <span className='text-lg animate-pulse'>⏱️</span>
                  {Math.floor((timeLeft % 60000) / 1000)}s
                </div>
              </div>
            ) : (
              <span className='text-red-500 font-bold'>
                Time's Up! Submitting...
              </span>
            )}
          </div>

          <div className='flex gap-5 items-center'>
            {test?.sections?.length > 0 ? (
              test.sections.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentSection(index)}
                  className={`cursor-pointer px-4 py-1 text-sm text-white border ${
                    index === currentSection ? 'bg-green-600' : 'bg-orange-500'
                  }`}
                >
                  {item.name}
                </div>
              ))
            ) : (
              <p className='text-gray-500'>No sections available</p>
            )}
          </div>
        </nav>
      </header>

      {/* Render Quiz Interface */}
      {test?.sections?.[currentSection]?.questionSet ? (
        <QuizInterface
          questionSet={test.sections[currentSection].questionSet}
        />
      ) : (
        <p className='text-center mt-10 text-gray-500'>Loading quiz...</p>
      )}
    </>
  )
}
