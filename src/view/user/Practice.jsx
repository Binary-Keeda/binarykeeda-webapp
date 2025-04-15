import React, { Suspense, useEffect } from 'react'
import UserDashboard from './Userdashboard'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
const Table = React.lazy(() => import('./components/Table'))
function PracticePage () {
  const CARDS = [
    {
      head: 'Aptitude',
      description:
        'Sharpen your problem-solving skills with logical reasoning, quantitative aptitude, and verbal ability.',
      src: '',
      link: '/user/practice/Aptitude'
    },
    {
      head: 'Miscellaneous',
      description:
        'Explore a variety of topics, including general knowledge, coding challenges, and brain teasers.',
      src: '',
      link: '/user/practice/Miscellaneous'
    },
    {
      head: 'Core Subjects',
      description:
        'Dive deep into essential subjects like Data Structures, Algorithms, OS, DBMS, and Computer Networks.',
      src: '',
      link: '/user/practice/Core'
    }
  ]
  return (
    <Suspense fallback={<>LOADING ... </>}>
      {/* <Table /> */}
      <section className='grid p-4 md:grid-cols-2  grid-cols-1 lg:grid-cols-4 gap-4'>
        {CARDS.map((i, idx) => (
          <div
            className='flex shadow-lg pb-4 flex-col hover:shadow-xl transition-all duration-200 hover:scale-105 h-[350px] rounded-[22px]'
            key={idx}
          >
            <img
              className='h-[200px] object-cover rounded-t-[22px]'
              src={
                'https://30dc.graphy.com/s/store/courses/64ff7f1be4b0607f6f9001f6/cover.jpg?v=2'
              }
              alt={i.head}
            />
            <div className='p-6 pb-5'>
              <h1 className='text-gray-900'>{i.head}</h1>
              <p className='text-xs text-gray-600 mt-1 mb-2'>{i.description}</p>
              <a href={i.link}>
                <Button
                  variant='contained'
                  color='primary'
                  sx={{ fontSize: 8 }}
                >
                  Solve
                </Button>
              </a>
              {/* <a className='text-xs bg-[#0149AD] px-4 py-1 text-white rounded-lg  ' href={i.link}>Solve</a> */}
            </div>
          </div>
        ))}
      </section>
    </Suspense>
  )
}
export default PracticePage
