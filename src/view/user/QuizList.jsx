import React from 'react'
import UserDashboard from './Userdashboard'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import Table from './components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { resetState, setCategory } from '../../redux/reducers/quizReducer'
import { getQuiz } from '../../redux/api/getQuiz'
import { useEffect } from 'react'

function QuizList () {
  const dispatch = useDispatch()
  const { category } = useSelector(s => s.quiz)
  const { name } = useParams()
  useEffect(() => {
    dispatch(resetState())
    dispatch(setCategory(name))
    if (category) {
      getQuiz()
    }
  }, [name, category])

  return (
    <>
      <Table category={name} />
    </>
  )
}

export default QuizList
