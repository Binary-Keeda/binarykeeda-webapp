import { Avatar, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Submissions from './components/Solutions'
import Leaderboard from './components/LeaderBoard'
import ProgressArea from './components/ProgressArea'
import { Link } from 'react-router-dom'
import ProfileCard from './components/ProfileCard'

function Home () {
  const { user, rankData } = useSelector(s => s.auth)


  return (
    <>
      <section className='gap-6 dark:text-gray-50 text-gray-700 flex flex-col lg:flex-row '>
        {/* <div className='relative flex flex-[.5] bg-white shadow-lg p-6 rounded-xl dark:bg-gray-800 flex-col items-center'>
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
          <Link to={'profile'}>
            <Button variant='contained' color='primary' sx={{ fontSize: 9 }}>
              Edit Profile
            </Button>
          </Link>
        </div> */}
       
        <ProfileCard user={user} />
        <ProgressArea solutions={user.solutions} />
        <Leaderboard user={user} userUniversity={user.university} />
      </section>

      <Submissions />
     
    </>
  )
}

export default Home
