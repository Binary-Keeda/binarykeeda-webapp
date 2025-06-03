import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FixedSizeList as List } from 'react-window'
import jsonData from './data/grouped_topics.json'
import { Article, ExpandMore } from '@mui/icons-material'
import { IconButton, LinearProgress } from '@mui/material'
import React from 'react'
export default function RoadMapSheet () {
  const [completed, setCompleted] = useState({})

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('day')) || {}
    setCompleted(stored)
  }, [])

  const getCompleTasl = () => {
    let total = 0
    let finished = 0
  }
  const handleCheckboxChange = (topicIdx, problemIdx) => {
    try {
      setCompleted(prev => {
        const updated = { ...prev }
        const key = `day-${topicIdx}`
        if (!updated[key]) updated[key] = []

        const index = updated[key].indexOf(problemIdx)
        if (index === -1) {
          updated[key].push(problemIdx)
        } else {
          updated[key].splice(index, 1)
        }

        localStorage.setItem('day', JSON.stringify(updated))
        return updated
      })
    } catch (e) {
      console.error('Error updating checkbox state:', e)
    }
  }

  return (
    <section className='flex justify-between gap-5 p-3'>
      <div className='flex-1 w-full flex-col flex font-[Lato] dark:text-white rounded-lg'>
        <Intro />
        <div className='mt-6'>
          {Object.entries(jsonData).map(([topic, data], index) => (
            <Accordion
              key={index}
              title={topic}
              idx={index}
              completed={completed[`day-${index}`] || []}
              data={data}
              handleCheck={handleCheckboxChange}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const Accordion = ({ title, idx, data, completed, handleCheck }) => {
  const [showData, setShowData] = useState(false)

  const progressValue = (completed.length / data.length) * 100

  return (
    <div className='w-full flex-col bg-primary dark:bg-support border-b'>
      <button
        onClick={() => setShowData(prev => !prev)}
        className='flex items-center justify-between px-7 py-5 w-full'
      >
        <div className='flex items-center'>
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
        <div className='flex items-center gap-4'>
          <LinearProgress
            variant='determinate'
            value={progressValue}
            sx={{
              height: 8,
              width: 300,
              borderRadius: 5,
              backgroundColor: '#inherit',
              '& .MuiLinearProgress-bar': {
                borderRadius: 5,
                backgroundColor: '#f7931e'
              }
            }}
          />
          <span className='text-sm text-gray-200'>
            {completed.length} / {data.length}
          </span>
        </div>
      </button>

      {showData && (
        <div className='px-7 pb-4'>
          <ProblemTable
            topicIdx={idx}
            data={data}
            completed={completed}
            handleCheck={handleCheck}
          />
        </div>
      )}
    </div>
  )
}

const ProblemTable = ({ data, topicIdx, completed, handleCheck }) => {
  return (
    <div className='relative border-t mt-4 flex flex-col w-full h-full dark:text-white dark:bg-bg-secondary text-gray-700 bg-white shadow-md rounded-xl bg-clip-border'>
      <table className='w-full rounded-md text-left table-auto'>
        <thead>
          <tr>
            <th
              className='p-4 border-b bg-blue-gray-50/50 text-sm opacity-70'
              scope='col'
            >
              Day
            </th>
            <th
              className='p-4 border-b bg-blue-gray-50/50 text-sm opacity-70'
              scope='col'
            >
              Type
            </th>
            <th
              className='p-4 border-b bg-blue-gray-50/50 text-sm opacity-70'
              scope='col'
            >
              Content
            </th>
            <th
              className='p-4 border-b bg-blue-gray-50/50 text-sm opacity-70'
              scope='col'
            >
              Links
            </th>
            <th
              className='p-4 border-b bg-blue-gray-50/50 text-sm opacity-70'
              scope='col'
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((problem, idx) => {
            const isCompleted = completed.includes(idx)

            return (
              <React.Fragment key={idx}>
                {/* Task Row */}
                <tr>
                  <td className='p-4 border-b' rowSpan={2}>
                    {problem.Day}
                  </td>
                  <td className='p-4 border-b font-semibold'>Task</td>
                  <td className='p-4 border-b'>{problem.Task}</td>
                  <td className='p-4 border-b'>
                    {problem?.Resource?.hyperlink && (
                      <a
                        href={problem.Resource.hyperlink}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 text-center underline'
                      >
                        {problem.Resource.value}
                      </a>
                    )}
                  </td>
                  <td className='p-4 border-b' rowSpan={2}>
                    <input
                      type='checkbox'
                      aria-checked={isCompleted}
                      checked={isCompleted}
                      onChange={() => handleCheck(topicIdx, idx)}
                    />
                  </td>
                </tr>

                {/* Project Row */}
                <tr>
                  <td className='p-4 border-b font-semibold'>Project</td>
                  <td className='p-4 border-b'>{problem.ProjectWork}</td>
                  <td className='p-4 border-b'>
                    <a
                      href={problem.ProjectResource.hyperlink}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-600 underline'
                    >
                      {problem.ProjectResource.value}
                    </a>
                  </td>
                 
                </tr>
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const Intro = () => {
  return (
    <>
      <h2 className='text-2xl font-semibold '>
        Binary Keeda Placement Roadmap
      </h2>
      <div className='mt-3 text-mdd dark:text-gray-100'>
        <p className='text-gray-700 dark:text-gray-300 text-base mb-4'>
          Welcome to the BinaryKeeda 210 Prep Sheet! This structured plan covers
          core subjects and aptitude essentials tailored for placement
          preparation. Track your progress, explore curated resources, and
          systematically complete each topic to strengthen your foundation.
        </p>
      </div>
      <div className='mb-3'>
        <p>
          <strong className='text-orange-500'>Note:</strong> Make sure to
          complete the topics sequentially. Each topic includes carefully
          selected subtopics and free resources. Mark them done as you go to
          maintain your weekly goals (20 hours/week suggested: 10 hrs study + 10
          hrs projects).
        </p>
      </div>
    </>
  )
}
