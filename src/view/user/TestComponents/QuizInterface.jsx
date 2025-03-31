// import React, { useState, useEffect } from 'react';
// import { IconButton, Button, TextField, Divider,} from '@mui/material';
// import {ArrowDropUp,Help,Fullscreen,ExitToApp,ArrowDropDown } from '@mui/icons-material';
// import axios from 'axios';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import SolutionWarningModal from '../../../components/modals/Warning';
// import { BASE_URL } from '../../../lib/config';
// import { useSelector } from 'react-redux';

// const QuizInterface = ({questionSet}) => {

//   const navigate = useNavigate()
//   const { user } = useSelector(s => s.auth)
//   const [response, setResponse] = useState({})
//   const [open, setOpen] = useState(false)
//   const [isOpen,setIsOpen] = useState(false)
//   const [submit, setSubmit] = useState(false)
//   const [solution, setSolution] = useState({})
//   const [currentPage, setCurrentPage] = useState(1);
//   const questionsPerPage = 1
//   const { id } = useParams()
//   const [windowDimensions, setWindowDimensions] = useState([
//     window.innerHeight,
//     window.innerWidth
//   ])
//   const [currentQuestion , setCurrentQuestion] = useState([])

//   // changehandeler
//   const changehandeler = e => {
//     const { name, value } = e.target
//     setResponse({ ...response, [name]: value })
//   }
//   const handleFullScreen = () => {
//     document
//       .getElementById('root')
//       .requestFullscreen()
//       .then(() => { })
//   }
//   const handleVisibilityChange = () => {
//     if (document.hidden) {
//       setOpen(true)
//     }
//   }
//   const handelResize = () => {
//     if (
//       window.innerHeight < windowDimensions[0] ||
//       window.innerWidth < windowDimensions[1]
//     ) {
//       setOpen(true)
//     }
//   }
//   const disableShortcuts = e => {
//     if (
//       (e.ctrlKey && (e.key === 'c' || e.key === 'v')) || // Copy-paste
//       (e.metaKey && (e.key === 'c' || e.key === 'v')) // For Mac users
//     ) {
//       e.preventDefault()
//       alert('Copy-paste is disabled!')
//     } else if (e.key == 'f') {
//       handleFullScreen()
//     }
//   }
//   // UFM Protection measures ends
//   const indexOfLastQuestion = currentPage * questionsPerPage
//   const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage
//   const currentQuestions =
//     questionSet?.slice(indexOfFirstQuestion, indexOfLastQuestion) ||
//     []
//   const totalPages = questionSet
//     ? Math.ceil(questionSet.length / questionsPerPage)
//     : 0
//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1)
//       document.getElementById(currentPage).scrollIntoView({
//         behavior: 'smooth',
//         block: 'start'
//       })
//     }
//   }
//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1)
//     document.getElementById(currentPage).scrollIntoView({
//       behavior: 'smooth',
//       block: 'end'
//     })
//   }

//   // Pagination Logic ends here
//   useEffect(() => {
//     // getQuiz()
//     document.addEventListener('visibilitychange', handleVisibilityChange)
//     window.addEventListener('resize', handelResize)
//     document.addEventListener('keydown', disableShortcuts)

//     return () => {
//       document.removeEventListener('visibilitychange', handleVisibilityChange)
//       window.removeEventListener('resize', handelResize)
//       document.removeEventListener('keydown', disableShortcuts)
//     }
//   }, [])

//   useEffect(() => {
//     setCurrentQuestion([questionSet[currentPage || 1]]);
//   } , [currentPage])
//   const submitHandler = async () => {
//     // setSubmit(true);
//     try {
//       solution['response'] = response;
//       const res = await axios.post(`${BASE_URL}/api/v1/solution/user/submit`, {
//         quizId: questionSet._id,
//         userId: user._id,
//         response: response
//       })
//       if (res.status === 200) {
//         setIsOpen(true)
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <main className='font bg-gray-100 h-screen w-screen overflow-x-hidden overflow-y-scroll'>
//       <div className='flex md:mr-4 flex-col justify-between h-[calc(100vh-70px)] pl-5 md:pr-28 pr-5 pt-10'>
//         {currentQuestion?.map((question, index) => (
//           <div key={index} className='flex md:flex-row flex-col justify-between gap-5'>
//             <div className='mb-8 flex-1 px-2 rounded-lg'>
//               <h1 className='text-lg font-semibold mb-6 text-gray-900'>
//                 Q{(currentPage - 1) * questionsPerPage + index + 1}:{' '}
//                 {question.question}
//               </h1>
//               {/* {question.image && (
//                 <img
//                   src={question.image}
//                   alt={`Question ${index + 1}`}
//                   className='w-96 h-auto rounded-lg mb-4'
//                 />
//               )} */}
//             </div>

//             <div className='flex justify-start flex-[0.8]'>
//                 <div className='w-full'>
//                   <h1 className='text-lg font-semibold mb-6 mx-3 text-sky-900'>
//                     Choose the correct option
//                   </h1>
//                   <div className='flex w-full flex-col gap-3'>
//                     {question.answerOptions.map(option => (
//                       <div
//                         key={option._id}
//                         className={`${response[question._id] != option._id
//                           ? 'bg-white text-gray-900  '
//                           : 'bg-sky-800 text-white'
//                           }   relative rounded-3xl cursor-pointer transition-all duration-200 hover:bg-sky-700 hover:text-white items-center px-5 w-full h-[50px] flex gap-1`}
//                       >
//                         <input
//                           required
//                           type='radio'
//                           name={`${question._id}`}
//                           value={`${option?._id}`}
//                           className='absolute w-full cursor-pointer h-full opacity-0 z-10'
//                           onChange={changehandeler}
//                         />
//                         <span className='absolute text-inherit z-9 w-full flex items-center py-2 h-[50px]'>
//                           {option.text}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//             </div>
//           </div>
//         ))}
//         <div className='flex mb-4 justify-between  w-full' >
//           <div className='flex flex-col  items-start'>
//             <div className='flex gap-2'>
//               <span className='text-md font-semibold'>Attempted</span>
//               {Object.keys(response).length}
//             </div>
//             <div className='flex gap-2'>
//               <span className='text-md font-semibold'>Total Questions</span>
//               {questionSet?.length}
//             </div>
//             <div className='flex items-center gap-2 mt-1'>
//               <div className='flex h-4 w-4 bg-green-500'></div>
//               <p>Attempted</p>
//             </div>
//             <div className='flex items-center gap-2 mt-1'>
//               <div className='flex h-4 w-4 bg-red-500'></div>
//               <p>Not Attempted</p>
//             </div>
//             <div className='flex items-center gap-2 mt-1'>
//               <div className='flex h-4 w-4 bg-sky-700'></div>
//               <p>Selected Option</p>
//             </div>
//           </div>
//           <div className='flex justify-center items-center'>
//             {currentPage === totalPages ? (
//               <div className='flex gap-2'>
//                 <Button variant='contained' onClick={handlePreviousPage}>
//                   Prev
//                 </Button>
//                 <Button
//                   onClick={() => {
//                     setSubmit(true)
//                   }}
//                   variant='contained'
//                 >
//                   Submit
//                 </Button>
//               </div>
//             ) : (
//               <div className='flex  gap-2'>
//                 {currentPage != 1 && (
//                   <Button variant='contained' onClick={handlePreviousPage}>
//                     Prev
//                   </Button>
//                 )}
//                 <Button variant='contained' onClick={handleNextPage}>
//                   Next
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>

//       </div>

//       <div className={`relative custom-scrollbar md:block hidden`}>
//         <div className='fixed right-3 overflow-x-hidden  custom-scrollbar overflow-y-auto rounded-sm bg-[#f1f1f1] top-[80px] shadow-xl w-24 gap-5 flex flex-col items-center max-h-[calc(100vh-100px)]'>
//           <ArrowDropUp />
//           {questionSet?.map((_, idx) => (
//             <div
//               key={idx}
//               onClick={() => {
//                 setCurrentPage(idx + 1)
//               }}
//               style={{
//                 height: '40px',
//                 width: '40px'
//               }}
//               // ${
//               //   currentPage === idx + 1
//               //     ? 'border-sky-900 border-2 bg-[#f1f1f1] text-sky-900 font-semibold shadow-sm'
//               //     : 'bg-sky-900 text-white'
//               // }
//               className={`cursor-pointer ${response[_._id]
//                 ? 'bg-green-600 text-white  border-2 font-semibold shadow-sm'
//                 : idx + 1 == currentPage
//                   ? 'bg-sky-700 text-white border-2'
//                   : 'bg-red-500 text-white border-2'
//                 } flex items-center p-3 relative z-50 justify-center h-10 w-10 rounded-full`}
//             >
//               <span id={idx + 1}>{idx + 1}</span>
//             </div>
//           ))}
//           <ArrowDropDown />
//         </div>
//       </div>
//       {/* {open && <SolutionWarningModal setOpen={setOpen} />} */}
//       {submit && (
//         <ConfirmModal submitHandler={submitHandler} setSubmit={setSubmit} />
//       )}
//       <QuizSubmittedModal navigate={navigate} isOpen={isOpen} setIsOpen={setIsOpen} />
//     </main>
//   )
// }

// export default QuizInterface

// const ConfirmModal = ({ submitHandler, setSubmit }) => {
//   return (
//     <div id='YOUR_ID' className='fixed z-50 inset-0 overflow-y-auto'>
//       <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
//         <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
//           <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
//         </div>

//         <span
//           className='hidden sm:inline-block sm:align-middle sm:h-screen'
//           aria-hidden='true'
//         >
//           &#8203;
//         </span>

//         <div
//           className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'
//           role='dialog'
//           aria-modal='true'
//           aria-labelledby='modal-headline'
//         >
//           <div className='hidden sm:block absolute top-0 right-0 pt-4 pr-4'>
//             <button
//               type='button'
//               onClick={() => {
//                 setSubmit(false)
//               }}
//               data-behavior='cancel'
//               className='bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
//             >
//               <span className='sr-only'>Close</span>
//               <svg
//                 className='h-6 w-6'
//                 xmlns='http://www.w3.org/2000/svg'
//                 fill='none'
//                 viewBox='0 0 24 24'
//                 stroke='currentColor'
//                 aria-hidden='true'
//               >
//                 <path
//                   stroke-linecap='round'
//                   stroke-linejoin='round'
//                   stroke-width='2'
//                   d='M6 18L18 6M6 6l12 12'
//                 />
//               </svg>
//             </button>
//           </div>
//           <div className='sm:flex sm:items-start'>
//             <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10'>
//               <svg
//                 className='h-6 w-6 text-blue-600'
//                 xmlns='http://www.w3.org/2000/svg'
//                 fill='none'
//                 viewBox='0 0 24 24'
//                 stroke='currentColor'
//                 aria-hidden='true'
//               >
//                 <path
//                   stroke-linecap='round'
//                   stroke-linejoin='round'
//                   stroke-width='2'
//                   d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
//                 />
//               </svg>
//             </div>
//             <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
//               <h3
//                 className='text-lg leading-6 font-medium text-gray-900'
//                 id='modal-headline'
//               >
//                 Are you sure you want to submit quiz ?
//               </h3>
//               <div className='mt-2'>
//                 <p className='text-sm text-gray-500'>
//                   You will not be allowed to change your resposne once submitted
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
//             <button
//               onClick={submitHandler}
//               type='button'
//               data-behavior='commit'
//               className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
//             >
//               Submit
//             </button>
//             <button
//               onClick={() => {
//                 setSubmit(false)
//               }}
//               type='button'
//               data-behavior='cancel'
//               className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm'
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// const QuizSubmittedModal = ({navigate, isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed z-50 backdrop-blur-sm inset-0 overflow-y-auto">
//       <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
//         {/* Background Overlay */}
//         <div className="fixed inset-0 transition-opacity">
//           <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//         </div>

//         <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>

//         {/* Modal Content */}
//         <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
//           <div className="sm:flex sm:items-start">
//             {/* Success Icon */}
//             <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
//               <svg
//                 className="h-6 w-6 text-green-600"
//                 stroke="currentColor"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M5 13l4 4L19 7"
//                 ></path>
//               </svg>
//             </div>

//             {/* Modal Text */}
//             <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//               <h3 className="text-lg leading-6 font-medium text-gray-900">
//                 Quiz Submitted Successfully!
//               </h3>
//               <div className="mt-2">
//                 <p className="text-sm leading-5 text-gray-500">
//                   Your quiz has been successfully submitted. You can check your
//                   score in the results section.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
//             <button
//               onClick={()=>{navigate('/user')}}
//               className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:w-auto"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /*
// \
//  // const getQuiz = async () => {
//   //   try {
//   //     const res = await axios.get(
//   //       `${BASE_URL}/api/v1/quiz/solution/${id}?userId=${user._id}`
//   //     )
//   //     if (res.data) {
//   //       setCurrentQuiz(res.data.quiz)
//   //       setSolution(res.data.solution)
//   //     }
//   //   } catch (error) {
//   //     console.log(error.message)

//   //     navigate('/user')
//   //     //   navigate('/login')
//   //   }
//   // }
//   // UFM Protection Measures

// */

// /**
//  *
//  *
//  *
//  *   useEffect(() => {
//     if (questionSet && solution) {
//       const startTime = new Date(solution.createdAt).getTime()
//       const quizEndTime = startTime + questionSet.duration * 60 * 1000
//       const interval = setInterval(() => {
//         const remainingTime = quizEndTime - Date.now()
//         setTimeLeft(Math.max(remainingTime, 0))
//         if (remainingTime <= 0) {
//           clearInterval(interval) // Stop the timer if time is up
//           submitHandler()
//         }
//       }, 1000)
//       return () => clearInterval(interval)
//     }
//   }, [questionSet, solution])
//  */
import React, { useEffect, useState } from 'react';

export default function QuizInterface({ questionSet = [] }) {
  const [currentQuestionNo, setCurrentQuestionNo] = useState(0);
  const [currQuestion, setCurrQuestion] = useState(questionSet[0] || null);

  useEffect(() => {
    if (questionSet.length > 0) {
      setCurrQuestion(questionSet[0]);
      setCurrentQuestionNo(0);
    }
  }, [questionSet]);

  if (!currQuestion) {
    return <div>Loading questions...</div>;
  }

  return (
    <>
      <section className="flex p-5">
        {/* Question Section */}
        <div className="flex-1">
          <h1>
            Q{currentQuestionNo + 1 + '. '}
            {currQuestion?.question || "No question available"}
          </h1>
          <div className="flex gap-3 flex-col pl-0 p-5">
            {currQuestion.answerOptions.map((option, idx) => (
              <label key={option._id || idx} className="py-3 w-[430px]  px-4 flex items-center gap-2 rounded-full bg-sky-700 cursor-pointer">
                <input
                  type="radio"
                  name={currQuestion._id || currQuestion.question}
                  value={option._id}
                  className='hidden'
                  onClick={() => console.log("Selected:", option.text)}
                />
                <span className="text-white">{option.text}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Quick Question Shift */}
        <div className='flex-[.6]' >
          <div className="grid grid-cols-4 gap-2">
            {questionSet.map((item, index) => (
              <button
                key={item._id || index}
                className={`h-6 w-6 flex justify-center items-center text-[#f3f3f3] p-4 rounded-full ${
                  index === currentQuestionNo ? "bg-blue-800" : "bg-sky-600"
                }`}
                onClick={() => {
                  setCurrentQuestionNo(index);
                  setCurrQuestion(questionSet[index]);
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
