import { Avatar, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Submissions from './components/Solutions'
import Leaderboard from './components/LeaderBoard'
import ProgressArea from './components/ProgressArea'

function Home () {
  const { user } = useSelector(s => s.auth)
  const [userInfoModal, setUserInfoModal] = useState(true)
  const [progress, setProgress] = useState(70)

  useEffect(() => {
    console.log('Home Dashboard mounted')
    const userinfo = localStorage.getItem('info')
    setUserInfoModal(userinfo)
  }, [])

  return (
    <>
      <section className='bg-gray-50 gap-6 dark:text-gray-50 text-gray-700 flex flex-col lg:flex-row dark:bg-gray-700'>
        <div className='relative flex flex-[.5] bg-white shadow-lg p-6 rounded-xl dark:bg-gray-800 flex-col items-center'>
          <div className='h-full items-end w-full'>
            <div className='relative h-[93px] flex justify-center items-end w-full rounded-md bg-[#fff6e9]'>
              <Avatar
                sx={{ position: 'absolute', bottom: '-30px' }}
                src={`${user.avatar}`}
                className='mb-4 border'
                style={{ width: '80px', height: '80px' }}
              />
            </div>
            <div className='text-center mt-[20px]'>
              <p className='text-xl font-bold'>{user.name}</p>
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                {user.email}
              </p>
            </div>
            <div className='mt-7 flex flex-col gap-1 items-start w-full text-sm'>
              <small>
                <strong>Semester:</strong> {user.semester || 'Not Provided'}
              </small>
              <small>
                <strong>Program:</strong> {user.program || 'Not Provided'}
              </small>
              <small>
                <strong>University:</strong> {user.university || 'Not Provided'}
              </small>
              <small>
                <strong>Specialisation:</strong>{' '}
                {user.specialisation || 'Not Provided'}
              </small>
              <small>
                <strong>Joined:</strong>{' '}
                {new Date(user.createdAt).toDateString()}
              </small>
              <small>
                <strong>Status:</strong> Active
              </small>
            </div>
          </div>
          <Button variant='contained' color='primary' sx={{ fontSize: 9 }}>
            Edit Profile
          </Button>
        </div>

        <ProgressArea  solutions={user.solutions}/>
        <Leaderboard />
      </section>

      <Submissions />
      {!userInfoModal && <InfoModal setUserInfoModal={setUserInfoModal} />}
    </>
  )
}

const InfoModal = ({ setUserInfoModal }) => {
  return (
    <div id='info-modal' className='fixed z-50 inset-0 overflow-y-auto'>
      <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
          <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
        </div>

        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
        </span>

        <div
          className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'
          role='dialog'
          aria-modal='true'
          aria-labelledby='modal-title'
        >
          <div className='hidden sm:block absolute top-0 right-0 pt-4 pr-4'>
            <button
              type='button'
              onClick={() => {
                localStorage.setItem('info', true)
                setUserInfoModal(true)
              }}
              className='bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              <span className='sr-only'>Close</span>
              <svg
                className='h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <div className='sm:flex sm:items-start'>
            <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10'>
              <svg
                className='h-6 w-6 text-yellow-600'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 16h-1v-4h-1m1 4h.01M12 18v.01M21 12.39a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
              <h3
                className='text-lg leading-6 font-medium text-gray-900'
                id='modal-title'
              >
                Important Information
              </h3>
              <div className='mt-2'>
                <p className='text-sm text-gray-500'>
                  This is not our final software. We are still working on it to
                  improve and enhance your experience. Thank you for your
                  understanding.
                </p>
              </div>
            </div>
          </div>
          <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
            <button
              onClick={() => {
                localStorage.setItem('info', true)
                setUserInfoModal(true)
              }}
              type='button'
              className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
