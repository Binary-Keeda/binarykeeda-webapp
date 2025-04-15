import React, { useState } from 'react'
import { Button } from '@mui/material'

const leaderboardData = {
  university: [
    { rank: 1, name: 'Aryan Bhandari', score: 980, university: 'UPES' },
    { rank: 2, name: 'Pranjal Rawat', score: 950, university: 'UPES' },
    { rank: 3, name: 'Tanvi Sharma', score: 920, university: 'UPES' },
  ],
  global: [
    { rank: 1, name: 'Ritika Panwar', score: 1000, university: 'DU' },
    { rank: 2, name: 'Aditya Mehra', score: 985, university: 'IIT Delhi' },
    { rank: 3, name: 'Aryan Bhandari', score: 980, university: 'UPES' },
  ],
}

function Leaderboard({ userUniversity }) {
  const [tab, setTab] = useState('university')

  return (
    <div className="flex-[0.8] dark:bg-gray-800 bg-white rounded-lg  flex flex-col">
      <div className="flex h-[50px] rounded-lg text-white gap-3 bg-gray-600 items-center px-4">
        <Button
          variant={tab === 'university' ? 'contained' : 'text'}
          onClick={() => setTab('university')}
          sx={{ fontSize: 10, borderRadius: 100, textTransform: 'none', color: tab === 'university' ? '#fff' : '#ccc' }}
        >
          University
        </Button>
        <Button
          variant={tab === 'global' ? 'contained' : 'text'}
          onClick={() => setTab('global')}
          sx={{ fontSize: 10, borderRadius: 100, textTransform: 'none', color: tab === 'global' ? '#fff' : '#ccc' }}
        >
          Global
        </Button>
      </div>

      {/* <div className="my-2">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
          #{leaderboardData[tab].findIndex((u) => u.name === 'Aryan Bhandari') + 1} in {tab === 'university' ? userUniversity : 'Global'}
        </p>
      </div> */}

      <div className="mt-4 flex flex-col gap-3">
        {leaderboardData[tab].map((user, i) => (
          <div key={i} className="flex justify-between items-center px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-md">
            <div className="flex gap-3 items-center">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-100">#{user.rank}</span>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-white">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-300">{user.university}</p>
              </div>
            </div>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-300">{user.score} pts</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default  Leaderboard;
