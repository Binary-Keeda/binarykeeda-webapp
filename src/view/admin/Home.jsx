import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Button, CircularProgress, imageListClasses } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Source } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { Add, EditNote } from '@mui/icons-material'
import { getQuiz } from '../../redux/api/getQuiz'
import { setCurrentPage } from '../../redux/reducers/quizReducer'
import { getTestAdmin } from '../../redux/api/getTest'
import TestsTable from './components/TestTable'

export default function Home () {
  const AddQuizModal = lazy(() => import('./modals/Addquiz'))
  const AddTestModal = lazy(() => import('./modals/AddTest'))
  const [AddQuiz, setAddQuiz] = useState(false)
  const [view,setView] =useState(localStorage.getItem('view'));
  const [AddTest, setAddTest] = useState(false)

  return (
    <>
      <section>
        <div className='flex justify-between items-center'>
          <div className='flex gap-3'>
            <Button variant='contained' sx={{ fontSize: 9 }} onClick={() => {setAddTest(true)}}>
              Create Test
            </Button>
            <Button
              variant='contained'
              onClick={() => {
                setAddQuiz(true)
              }}
              sx={{ fontSize: 9 }}
            >
              Add Quiz
            </Button>
          </div>
          <div>
            <select name="view" value={view}  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            onChange={(e) => { localStorage.setItem('view' , e.target.value);setView(e.target.value)} } >
              <option value="quiz">Quiz</option>
              <option value="test">Test</option>
            </select>
          </div>
        </div>
      </section>
      <section className='flex  gap-5 mt-3'>
        <div className='flex-1'>
          {
            view != "quiz" ?
            <TestsTable/>:
          <QuizTable/>
          }
        </div>
      </section>
      {AddQuiz && (
        <Suspense
          fallback={
            <div className='fixed flex h-screen w-screen left-0 top-0 z-50 justify-center items-center bg-black bg-opacity-45 '>
              <div className='loader2'></div>
            </div>
          }
        >
          <AddQuizModal setModalClose={setAddQuiz} />
        </Suspense>
      )}

      {AddTest && (
        <Suspense
          fallback={
            <div className='fixed flex h-screen w-screen left-0 top-0 z-50 justify-center items-center bg-black bg-opacity-45 '>
              <div className='loader2'></div>
            </div>
          }
        >
          <AddTestModal setModalClose={setAddTest} />
        </Suspense>
      )}
    </>
  )
}

const QuizTable = () => {
  const { hasMore, page, loading, data, currentPage, totalPages } = useSelector(
    s => s.quiz
  )
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(data)
  }, [data])

  const nextPage = () => {
    if (currentPage == page - 1 || currentPage == page) {
      getQuiz()
    } else {
      dispatch(setCurrentPage(currentPage + 1))
    }
  }
  const prevPage = () => {
    if (currentPage == 1) {
      return
    } else {
      dispatch(setCurrentPage(currentPage - 1))
    }
  }
  return (
    <>
      <div className='relative flex flex-col w-full  overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border'>
        <table className='w-full text-left table-auto min-w-max'>
          <thead>
            <tr>
              <th className='p-4 border-b border-slate-200 bg-slate-50'>
                <p className='text-sm font-normal leading-none text-slate-500'>
                  Title
                </p>
              </th>
              <th className='p-4 border-b border-slate-200 bg-slate-50'>
                <p className='text-sm font-normal leading-none text-slate-500'>
                  Difficulty
                </p>
              </th>
              <th className='p-4 border-b border-slate-200 bg-slate-50'>
                <p className='text-sm font-normal leading-none text-slate-500'>
                  Duration
                </p>
              </th>
              <th className='p-4 border-b border-slate-200 bg-slate-50'>
                <p className='text-sm font-normal leading-none text-slate-500'>
                  Category
                </p>
              </th>
              <th className='p-4 border-b border-slate-200 bg-slate-50'>
                <p className='text-sm font-normal leading-none text-slate-500'>
                  Edit
                </p>
              </th>
              <th className='p-4 border-b border-slate-200 bg-slate-50'>
                <p className='text-sm font-normal leading-none text-slate-500'>
                  View
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {data[currentPage]?.map((i, key) => (
              <>
                <tr
                  key={key}
                  className='hover:bg-slate-50 border-b border-slate-200'
                >
                  <td className='p-4 py-5'>
                    <p className='block font-semibold text-sm text-slate-800'>
                      {i.title}
                    </p>
                  </td>
                  <td className='p-4 py-5'>
                    <p className='text-sm text-slate-500'>{i.difficulty}</p>
                  </td>
                  <td className='p-4 py-5'>
                    <p className='text-sm text-slate-500'>
                      {i.duration + ' ' + 'min.'}
                    </p>
                  </td>
                  <td className='p-4 py-5'>
                    <p className='text-sm text-slate-500'>{i.category}</p>
                  </td>
                  <td className='p-4 py-5'>
                    <Link to={`edit/${i._id}`}>
                      <EditNote />
                    </Link>
                  </td>
                  <td className='p-4 py-5'>
                    <Link to={`/admin/view/${i._id}`}>
                      <Source />
                    </Link>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>

        <div className='flex justify-between items-center px-4 py-3'>
          <div className='text-sm text-slate-500'>
            Showing <b>1-{data[currentPage]?.length}</b> of {totalPages}
          </div>
          <div className='flex space-x-1'>
            <button
              onClick={prevPage}
              disabled={currentPage == 1}
              className='px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease'
            >
              Prev
            </button>
            {/* <button className='px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease'>
                  1
                </button>
                <button className='px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease'>
                  2
                </button>
                <button className='px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease'>
                  3
                </button> */}
            <button
              disabled={!hasMore && currentPage == page - 1}
              onClick={nextPage}
              className='px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease'
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

