import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Submissions from './components/Solutions';
import UserDashboard from './Userdashboard'
import Piechart from './components/Piechart'

function Home() {
  const { user } = useSelector(s => s.auth);
  const [userInfoModal, setUserInfoModal] = useState(true);

  useEffect(() => {
    const userinfo = localStorage.getItem('info');
    setUserInfoModal(userinfo);
  }, []);

  const svgIcons = [
    `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 18.364l2.122-2.121M2.808 13.636l2.121 2.121M21.192 13.636l-2.121 2.121M18.879 18.364l-2.122-2.121M5.636 8.464L7.758 6.343m4.95 0L12 3m4.242 4.95l-2.121-2.12M12 16.95v5.05m-7.07-2.929A9 9 0 1121 12v1m-9 5a9 9 0 000-10m0 0L7.757 6.344m4.95 0L16.243 6.34" /></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2s-2-.9-2-2v-4c0-1.1.9-2 2-2zm0 14c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16.072 13.636L12 16.95l-4.071-3.314m0-3.271l4.072-3.314 4.072 3.314m1.357 3.271v3.929a1.95 1.95 0 01-.622 1.414 1.951 1.951 0 01-1.735.478M7.05 19.792a1.951 1.951 0 01-1.734-.478A1.951 1.951 0 014.694 17.9v-3.929" /></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2s-2-.9-2-2v-4c0-1.1.9-2 2-2zm0 14c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /></svg>`
  ];

  return (
    <>
      <section className='bg-gray-50 gap-6 dark:text-gray-50 text-gray-700 flex flex-col lg:flex-row dark:bg-gray-700'>
        {/* Profile Section */}
        <div className='flex flex-[.8] bg-white shadow-lg  p-6 rounded-xl dark:bg-gray-800 flex-col items-center '>
          <Avatar className='mb-4' style={{ width: '80px', height: '80px' }} />
          <p className='text-xl font-bold'>{user.name}</p>
          <p className='text-sm text-gray-600 dark:text-gray-300'>{user.email}</p>
          <div className='mt-3 flex flex-col items-start w-full text-sm'>
            <small className='text-wrap'><strong>University:</strong> {user.university || 'Not Provided'}</small>
            <small><strong>Program:</strong> {user.program || 'Not Provided'}</small>
            <small><strong>Role:</strong> {user.role || 'Not Provided'}</small>
            <small><strong>Date of Birth:</strong> {new Date(user.dob).toDateString()}</small>
            <small><strong>Joined:</strong> {new Date(user.createdAt).toDateString()}</small>
          </div>
        </div>

        {/* Chart & Advertisement Section */}
        <div className='flex flex-[.8] flex-col items-center'>
          <Piechart />
        
        </div>

        {/* Actions Section */}
        <div className='flex-[.8] grid dark:bg-gray-800 grid-cols-1 lg:grid-cols-1 bg-white gap-6 rounded-lg shadow-lg p-6'>
          {[
            {
              href: '/user/profile',
              title: 'Complete Your Profile',
              description: 'Update your profile to access all features.',
              svg: svgIcons[0]
            },
            {
              href: '/user/coding',
              title: 'Practice Challenges',
              description: 'Enhance your skills with curated challenges.',
              svg: svgIcons[1]
            }
          ].map((action, idx) => (
            <Link
              to={action.href}
              key={idx}
              className='w-full flex-[.5] h-full bg-sky-700 text-white rounded-lg flex flex-col justify-center items-center p-3 hover:bg-sky-800 transition duration-300 cursor-pointer text-center'
            >
              <div dangerouslySetInnerHTML={{ __html: action.svg }} className='mb-4'></div>
              <a className='text-md font-medium mb-2'>{action.title}</a>
              <p className='text-sm'>{action.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <Submissions />

      {!userInfoModal && <InfoModal setUserInfoModal={setUserInfoModal} />}
    </>
  );
}

const InfoModal = ({ setUserInfoModal }) => {
  return (
    <div id='info-modal' className='fixed z-50 inset-0 overflow-y-auto'>
      <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
          <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
        </div>

        <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
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
                localStorage.setItem('info', true);
                setUserInfoModal(true);
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
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
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
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 16h-1v-4h-1m1 4h.01M12 18v.01M21 12.39a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
            <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
              <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-title'>
                Important Information
              </h3>
              <div className='mt-2'>
                <p className='text-sm text-gray-500'>
                  This is not our final software. We are still working on it to improve and enhance your experience. Thank you for your understanding.
                </p>
              </div>
            </div>
          </div>
          <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
            <button
              onClick={() => {
                localStorage.setItem('info', true);
                setUserInfoModal(true);
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
  );
};

export default UserDashboard(Home);