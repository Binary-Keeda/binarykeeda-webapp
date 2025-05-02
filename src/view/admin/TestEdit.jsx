import React, { Suspense, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../lib/config'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material'
import { Add } from '@mui/icons-material'
const AdminAddSection = React.lazy(() => import('./components/AddSectionModal'))
export default function TestEdit () {
  const { id } = useParams()
  const [currTest, setCurrTest] = useState(null)
  const [currSection, setCurrSection] = useState()

  const [showSection, setShowSection] = useState(false)


  // routes importing

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v2/test/${id}`, { withCredentials: true })
      .then(res => {
        setCurrTest(res.data)
        setCurrSection(res.data?.sections[0])
      })
      .catch(e => console.log(e))
  }, [id])

  return (
    <>
      {/* Quiz details edit */}
      <section className='rounded-lg items-center py-3 grid grid-cols-1 space-y-3 shadow-lg font-sans  p-4'>
        <h1>Edit Test</h1>
        <div className='flex items-center gap-3'>
          <h1 className='text-nowrap'>Test id : </h1>
          <input
            className='custominput'
            type='text'
            value={currTest?._id}
            readOnly
          />
        </div>
        <div className='flex items-center gap-3'>
          <h1 className='text-nowrap'>Test name : </h1>
          <input
            className='custominput'
            type='text'
            value={currTest?.name}
            readOnly
          />
        </div>
        <div className='flex items-center gap-3'>
          <h1 className='text-nowrap'>Test duration : </h1>
          <input
            className='custominput'
            type='text'
            value={currTest?.duration + ' min.'}
            readOnly
          />
        </div>
        <div className='flex items-center gap-3'>
          <h1 className='text-nowrap'>Test decription : </h1>
          <input
            className='custominput'
            type='text'
            value={currTest?.description}
            readOnly
          />
        </div>
        <div className='flex items-center gap-3'>
          <h1 className='text-nowrap'>Is Available </h1>
          <input
            className=''
            type='checkbox'
            checked={currTest?.isAvailable}
            readOnly
          />
        </div>
        <Button sx={{ fontSize: 11, width: '100px' }} variant='contained'>
          Update
        </Button>
      </section>

      <section className='rounded-lg mt-4 items-center py-3 flex gap-4 shadow-lg font-sans  p-4'>
        {currTest?.sections?.map((s, idx) => (
          <Button
            onClick={() => {
              setCurrSection(s)
            }}
            sx={{
              fontSize: 10,
              bgcolor: s._id == currSection?._id ? '#000' : ''
            }}
            variant='contained'
          >
            {s.name}
          </Button>
        ))}
        <Tooltip title='Add section'>
          <IconButton
            onClick={() => {
              setShowSection(true)
            }}
            color='primary'
            focusRipple
          >
            <Add />
          </IconButton>
        </Tooltip>
      </section>
      <section className='mt-4 bg-white  shadow-md p-4'>
        {currSection?.sectionType == "Quiz" && (
            <>lorem</>
        )}
        {currSection?.questionSet?.map((q, idx) => (
          <Accordion>
            <AccordionSummary>
              <div className='flex gap-3 items-center w-full'>
                <p className='text-sm'>{idx + 1 + '. '}</p>
                <div className='w-full'>
                  <label className='text-xs font-bold ml-1'>Question</label>
                  <input
                    type='text'
                    className='custominput'
                    value={q.question}
                    name=''
                    id=''
                  />
                </div>
                <div>
                  <label className='text-xs font-bold ml-1'>Marks</label>
                  <input
                    type='number'
                    className='custominput '
                    // style={{ width: 100 }}
                    value={q.negative}
                    name=''
                    id=''
                  />
                </div>
                <div>
                  <label className='text-xs font-bold ml-1'>Negative</label>
                  <input
                    type='number'
                    className='custominput '
                    value={q.marks}
                    name=''
                    id=''
                  />
                </div>
              </div>
            </AccordionSummary>

            <AccordionDetails>
              {q.answerOptions.map((o, idx) => (
                <div className='flex mb-1 gap-3 items-center'>
                  <p className='text-xs text-nowrap'>Option {idx + 1}</p>
                  <input
                    style={{ width: '300px' }}
                    type='text'
                    className='custominput w-[100px]'
                    value={o.text}
                    name=''
                    id=''
                  />
                  <input
                    type='checkbox'
                    checked={o.isCorrect}
                    placeholder='isCorrect'
                    name=''
                    id=''
                  />
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </section>

      {/* ADD QUIZ MODAL BOX */}

      {/* ADD SECTION MODAL BOX */}
      {id && showSection && (
        <Suspense
          fallback={
            <div>
              <div className='loader'></div>
            </div>
          }
        >
          <AdminAddSection
            closeModal={() => {
              setShowSection(false)
            }}
            testId={id}
          />
        </Suspense>
      )}
    </>
  )
}
