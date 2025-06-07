import React, { useState } from 'react'
import { Button, CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'

const getMedal = rank => {
  if (rank === 1) return '/icons/medal-first.png'
  if (rank === 2) return '/icons/medal-second.png'
  if (rank === 3) return '/icons/medal-third.png'
  return null
}

function Leaderboard () {
  const { user, rankData, loading } = useSelector(s => s.auth) // using dynamic Redux data
  const [tab, setTab] = useState('university')

  const activeLeaderboard =
    tab === 'university' ? rankData?.topUniversity : rankData?.topGlobal || []


  return (
    <div className='flex-[.7] bg-primary dark:bg-support rounded-md shadow-lg p-4 flex flex-col min-h-[400px]'>
      <div className='rounded-lg flex flex-col gap-3'>
        <div className='flex items-center justify-between px-4 py-2 rounded-md bg-support dark:bg-primary shadow-sm'>
          <div className='text-sm font-medium opacity-80'>Institution</div>
          <div className='text-sm font-normal text-xs'>{user?.university || 'N/A'}</div>
        </div>

        <div className='flex h-[50px] rounded-lg text-white gap-3 bg-support dark:bg-primary items-center px-4'>
          <Button
            variant={tab === 'university' ? 'contained' : 'text'}
            onClick={() => setTab('university')}
            sx={{
              fontSize: 12,
              borderRadius: 20,
              textTransform: 'none',
              color: tab === 'university' ? '#fff' : '#ccc'
            }}
          >
            University
          </Button>
          <Button
            variant={tab === 'global' ? 'contained' : 'text'}
            onClick={() => setTab('global')}
            sx={{
              fontSize: 12,
              borderRadius: 20,
              textTransform: 'none',
              color: tab === 'global' ? '#fff' : '#ccc'
            }}
          >
            Global
          </Button>
        </div>

        {loading ? (
          <div className='flex justify-center items-center h-32'>
            <CircularProgress size={30} />
          </div>
        ) : (
          <div className='mt-4 flex flex-col gap-3'>
            {activeLeaderboard?.map((entry, i) => (
              <div
                key={entry.userId || i}
                className='flex justify-between items-center px-4 py-2 bg-support dark:bg-primary rounded-md'
              >
                <div className='flex gap-3 items-center'>
                  {getMedal(entry.rank) && (
                    <img
                      className='h-7'
                      src={getMedal(entry.rank)}
                      alt={`rank-${entry.rank}`}
                    />
                  )}
                  <div>
                    <p className='text-sm font-semibold text-gray-800 dark:text-white'>
                      {entry.name}
                    </p>
                    <p className='text-xs text-gray-500 dark:text-gray-300'>
                      {entry.university}
                    </p>
                  </div>
                </div>
                <span className='text-sm font-bold text-[#1976d2] dark:text-blue-300'>
                  {entry.points} pts
                </span>
              </div>
            ))}

              <div className='p-4 bg-support dark:bg-primary rounded-md mt-4 shadow'>
                <h1 className='text-md font-bold text-gray-800 dark:text-white mb-2'>
                  Your Rank
                </h1>
                <div className='flex justify-between items-center'>
                  <div className='flex gap-3 items-center'>
                    {getMedal(user.solutions.Rank) && (
                      <img
                        className='h-7'
                        src={getMedal(user.solutions.Rank)}
                        alt=''
                      />
                    )}
                    <div>
                      <p className='text-sm font-semibold text-gray-800 dark:text-white'>
                        #{user.solutions.Rank} {user?.name}
                      </p>
                      <p className='text-xs text-gray-500 dark:text-gray-300'>
                        {user?.university}
                      </p>
                    </div>
                  </div>
                  <small className='text-[#1976d2] text-md font-bold dark:text-blue-300'>
                    {user?.solutions?.Points} pts
                  </small>
                </div>
              </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Leaderboard
