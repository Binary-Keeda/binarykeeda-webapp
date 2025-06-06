import { useEffect, useState } from 'react'
import problemset from '../data/coding_with_difficulty.json'
import { Article, ExpandMore, Shuffle } from '@mui/icons-material'
import { IconButton, LinearProgress } from '@mui/material'
import {} from '@mui/material'
import { Link } from 'react-router-dom'
export default ({ setStats }) => {
  const [problems, setProblems] = useState([])
  const [completed, setCompleted] = useState({})

  useEffect(() => {
    setProblems(problemset)
    const stored = JSON.parse(localStorage.getItem('completed')) || {}
    setCompleted(stored)
  }, [])

  const handleCheckboxChange = (topicIdx, problemIdx) => {
    const newCompleted = { ...completed }

    if (!newCompleted[`topic-${topicIdx}`])
      newCompleted[`topic-${topicIdx}`] = []

    const idx = newCompleted[`topic-${topicIdx}`].indexOf(problemIdx)
    if (idx === -1) {
      newCompleted[`topic-${topicIdx}`].push(problemIdx)
    } else {
      newCompleted[`topic-${topicIdx}`].splice(idx, 1)
    }

    setCompleted(newCompleted)
    localStorage.setItem('completed', JSON.stringify(newCompleted))
  }

  const getGlobalStats = () => {
    let total = 0
    let done = 0

    let easy = 0,
      medium = 0,
      hard = 0
    let easyDone = 0,
      mediumDone = 0,
      hardDone = 0

    problems.forEach((topic, topicIdx) => {
      topic.problems.forEach((p, problemIdx) => {
        total++

        const isCompleted = completed[`topic-${topicIdx}`]?.includes(problemIdx)

        // Count difficulty
        switch (p.difficulty) {
          case 'Easy':
            easy++
            if (isCompleted) easyDone++
            break
          case 'Medium':
            medium++
            if (isCompleted) mediumDone++
            break
          case 'Hard':
            hard++
            if (isCompleted) hardDone++
            break
          default:
            break
        }

        // Count total done
        if (isCompleted) done++
      })
    })

    return {
      total,
      done,
      easy,
      easyDone,
      medium,
      mediumDone,
      hard,
      hardDone
    }
  }

  useEffect(() => {
    if (problems.length > 0) {
      setStats(getGlobalStats())
    }
  }, [problems])

  useEffect(() => {
    setStats(getGlobalStats())
  }, [completed])
  const { total, done, easy, medium, hard } = getGlobalStats()

  return (
    <main className='mt-10 flex flex-col'>
      <div className='relative flex w-full mb-5 justify-between px-7 py-5 rounded-lg text-gray-700 bg-primary dark:bg-support bg-clip-border'>
        <div>
          <h5 className='text-xl font-semibold'>DSA Sheet</h5>
          <p className='text-base'>Track progress across all topics</p>
        </div>
        <div className='h-10'>
          <IconButton color='inherit'>
            <Shuffle color='inherit' />
          </IconButton>
        </div>
      </div>

      {problems?.map((p, idx) => (
        <Accordion
          key={idx}
          idx={idx}
          data={p.problems}
          title={p.topicName}
          completed={completed[`topic-${idx}`] || []}
          handleCheck={problemIdx => handleCheckboxChange(idx, problemIdx)}
        />
      ))}
    </main>
  )
}
const Accordion = ({ title, idx, data, completed, handleCheck }) => {
  const [showData, setShowData] = useState(false)

  return (
    <div className={`w-full flex-col bg-primary dark:bg-support border-b`}>
      <button
        onClick={() => setShowData(prev => !prev)}
        className='flex items-center justify-between px-7 py-5 w-full'
      >
        <div className='flex items-center justify-between'>
          <div>
            <ExpandMore
              className={`transition-transform duration-300 ${
                showData ? 'rotate-360' : '-rotate-90'
              }`}
            />
            <span className='ml-4 font-semibold text-lg'>{`Topic ${
              idx + 1
            }`}</span>
            <span className='ml-4 text-lg font-semibold'>{title}</span>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <LinearProgress
            variant='determinate'
            value={(completed.length / data.length) * 100}
            sx={{
              height: 8,
              width: 300,
              borderRadius: 5,
              backgroundColor: '#inherit',
              '& .MuiLinearProgress-bar': {
                borderRadius: 5,
                backgroundColor: '#f7931e' // Striver-like orange
              }
            }}
          />
          {completed.length + ' / '}
          {data.length}
        </div>
      </button>

      {showData && (
        <div className='px-7 pb-4'>
          <ProblemTable
            data={data}
            completed={completed}
            handleCheck={handleCheck}
            topicName={title}
          />
        </div>
      )}
    </div>
  )
}

const ProblemTable = ({ data, completed, handleCheck , topicName }) => {
  return (
    <div className='relative mt-4 flex flex-col w-full h-full dark:text-white dark:bg-bg-secondary text-gray-700 bg-white shadow-md rounded-xl bg-clip-border'>
      <table className='w-full text-left table-auto'>
        <thead>
          <tr>
            {['Problem', 'Difficulty', 'Article', 'Link', 'Status'].map(h => (
              <th
                key={h}
                className='p-4 border-b bg-blue-gray-50/50 text-sm opacity-70'
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((problem, idx) =>
            problem.title ? (
              <>
                <tr key={idx}>
                  <td className='p-4 border-b'>{problem.title}</td>
                  <td className='p-4 border-b'>
                    <span
                      className={`px-2 py-1 text-xs font-bold rounded-md ${
                        problem.difficulty === 'Easy'
                          ? 'bg-blue-500/20 text-blue-900'
                          : problem.difficulty === 'Medium'
                          ? 'bg-green-500/20 text-green-900'
                          : 'bg-red-500/20 text-red-900'
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className='p-4 border-b'>
                    <Link to={`/user/binarykeeda-dsa-sheet/description/${encodeURIComponent(topicName)}/${encodeURIComponent(problem.title)}`}>
                      <Article />
                    </Link>
                  </td>
                  <td className='p-4 border-b'>
                    <a
                      href={problem.link}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Link
                    </a>
                  </td>
                  <td className='p-4 border-b'>
                    <input
                      type='checkbox'
                      checked={completed.includes(idx)}
                      onChange={() => handleCheck(idx)}
                    />
                  </td>
                </tr>
              </>
            ) : (
              <>
                <tr>
                  <td className='p-4 border-b'>
                    {problem.task}
                  </td>
                  <td className='p-4 border-b'></td>
                  <td className='p-4 border-b'></td>
                  <td className='p-4 border-b'></td>
                  <td className='p-4 border-b'></td>
                </tr>
              </>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}
