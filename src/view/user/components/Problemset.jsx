import React, { useEffect, useState } from 'react'
import problemset from '../data/coding.json'
import { ArrowRight, KeyboardArrowRight, MenuOpen } from '@mui/icons-material'
import { Link } from 'react-router-dom'

export default function ProblemSet () {
  const [progress, setProgress] = useState({
    noOfProblems: 0,
    problemsSolved: 0
  })
  const [problemByTopic, setProblemByTopic] = useState({})
  const [showProgress, setShowProgress] = useState(false)
  const selectTask = (name, topic) => {
    const key = `${name}+${topic}`
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, 'selected')
    }
    updateProgress()
  }

  const selectQuestion = (name, topic) => {
    const key = `${name}+${topic}`
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, 'selected')
    }
    updateProgress()
  }

  const updateProgress = () => {
    let total = 0
    let completed = 0
    let problemsByTopic = {}

    problemset.forEach(topic => {
      problemsByTopic[topic.topicName] = 0

      topic.tasks?.forEach(task => {
        total++
        if (localStorage.getItem(`${task.title}+${topic.topicName}`)) {
          completed++
        }
      })

      topic.problems?.forEach(problem => {
        total++
        const key = `${problem.title}+${topic.topicName}`
        if (localStorage.getItem(key)) {
          completed++
          problemsByTopic[topic.topicName]++
        }
      })
    })

    setProblemByTopic(problemsByTopic)
    setProgress({ noOfProblems: total, problemsSolved: completed })
  }

  useEffect(() => {
    updateProgress()
  }, [])

  return (
    <div className='flex  w-full gap-8'>
      {/* {!showProgress && (
        <div
          onClick={() => {
            setShowProgress(true)
          }}
          className='fixed p-2 cursor-pointer z-40 right-0 bg-sky-600 text-white rounded-full'
        >
          <MenuOpen
            sx={{
              cursor: 'pointer',
              '& .MuiPaper-root': {
                backgroundColor: 'skyblue',
                color: 'white'
              },
              fontSize: '30px'
            }}
          />
        </div>
      )} */}
{/*  [ 
    {
      .. problems
    }
] */}
      <div className='flex-1 flex flex-col gap-3'>
        {problemset.map((topic, index) => (
          <div
            key={index}
            className='rounded-lg bg-clip-border shadow-md dark:bg-gray-800 text-gray-900 dark:text-gray-50 bg-white transition-shadow duration-300'
          >
            <h3 className='text-xl px-4 py-7 font-bold leading-none border-slate-100 text-gray-800 dark:text-gray-50 bg-orange-50 dark:bg-gray-800'>
              {`Topic ${index + 1}: ${topic.topicName}`}
            </h3>

            <hr />

            <div>
              {topic.tasks?.map((task, idx) => (
                <div
                  className='flex hover:bg-gray-50 hover:dark:bg-gray-600 justify-between dark:text-gray-50 items-center border-b py-6 last:border-b-0'
                  key={idx}
                >
                  <p className='text-sm px-4 font-normal leading-none dark:text-gray-50 text-gray-800'>
                    {task.title ? idx + '. ' : ''} {task?.title || task?.task}
                  </p>
                  {task.title && (
                    <div className='flex px-8 gap-10'>
                      <a href='#' className='hover:underline'>
                        Description
                      </a>
                      <a
                        className='text-sky-700 hover:underline'
                        href={task?.link}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Link
                      </a>
                      <input
                        checked={
                          !!localStorage.getItem(
                            `${task.title}+${topic.topicName}`
                          )
                        }
                        type='checkbox'
                        className='cursor-pointer'
                        onChange={() =>
                          selectTask(task?.title, topic.topicName)
                        }
                      />
                    </div>
                  )}
                </div>
              ))}

              {topic.problems?.map((problem, idx) => (
                <div
                  className='flex hover:bg-gray-50 hover:dark:bg-gray-700 justify-between dark:text-gray-50 items-center border-b py-6 last:border-b-0'
                  key={idx}
                >
                  <p className='text-sm px-4 font-normal leading-none dark:text-gray-50 text-gray-700'>
                    {problem?.title}
                  </p>
                  <div className='flex px-8 gap-10'>
                    <a href='#' className='hover:underline'>
                      Description
                    </a>
                    <a
                      className='text-sky-700 hover:underline'
                      href={problem?.link}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Link
                    </a>
                    <input
                      checked={
                        !!localStorage.getItem(
                          `${problem.title}+${topic.topicName}`
                        )
                      }
                      type='checkbox'
                      className='cursor-pointer'
                      onChange={() =>
                        selectQuestion(problem?.title, topic.topicName)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div
        className={`transition-all duration-200  ${
          showProgress ? 'w-[350px] ' : 'w-0 '
        } relative top-[0px] h-[calc(100vh-70px)]`}
      >
        <aside
          className={`transition-all flex flex-col justify-between pb-6 right-0  duration-200 ${
            showProgress ? 'translate-x-0' : 'translate-x-full'
          } fixed top-[70px] h-[calc(100vh-70px)] dark:bg-gray-800 dark:text-gray-50 bg-white w-[350px]`}
        >
          <section className='flex flex-col items-center'>
            <div className='flex w-full items-center justify-between  my-5 gap-4 mx-4'>
              <div
                onClick={() => {
                  setShowProgress(false)
                }}
                className='flex ml-3 cursor-pointer  items-center'
              >
                <KeyboardArrowRight />
              </div>
              <div className='flex-1 items-center bg-slate-200 flex rounded-2xl mr-5'>
                <h1 className='text-lg p-4 text-gray-600'>Users Progress</h1>
              </div>
            </div>
            <Link
              to={'/user/practice'}
              className='w-full justify-items-start mx-5 px-6 cursor-pointer'
            >
              Go to Quiz Section <ArrowRight />
            </Link>
            <div className='px-5 py-4'>
              <video className='w-full h-full' controls>
                <source src='video.mp4' type='video/mp4' />
                <source src='video.ogg' type='video/ogg' />
                Your browser does not support the video tag.
              </video>
            </div>
          </section>
          <div>
            {
              <div className='mx-5'>
                <div className='flex flex-wrap gap-3'>
                  {Object.entries(problemByTopic).map(([topic, solved]) => (
                    <li
                      key={topic}
                      className='text-sm bg-slate-200 rounded-[20px] list-none p-2 text-gray-700'
                    >
                      {topic} x <span className=''>{solved}</span>
                    </li>
                  ))}
                </div>
              </div>
            }
          </div>
        </aside>
      </div>
    </div>
  )
}
