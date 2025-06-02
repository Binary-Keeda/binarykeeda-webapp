import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import Hero from '../components/Home/Hero'
import About from '../components/Home/About'
import Showcase from '../components/Home/ShowCase'
import Features from '../components/Home/Features'
import Content from '../components/Home/Content'
import Footer from '../components/Home/Footer'

const Home = () => {
  const [userInfoModal, setUserInfoModal] = useState(true)

  useEffect(() => {
    const userinfo = localStorage.getItem('account')
    setUserInfoModal(userinfo)
  }, [])
  return (
    <section className=''>
      {!userInfoModal && <InfoModal setUserInfoModal={setUserInfoModal} />}
      <Hero />
      <About />
      <Showcase />
      <Content />
      <Footer />
    </section>
  )
}

export default Layout(Home)

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
                Account Notice
              </h3>
              <div className='mt-2'>
                <p className='text-sm text-gray-500'>
                  Sorry! Your account may have been deleted as part of our
                  ongoing improvements to enhance performance and security.
                  <br />
                  You’ll need to register again to continue using our services.
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
