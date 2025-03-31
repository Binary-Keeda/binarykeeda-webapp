import React from 'react'
import UserDashboard from './Userdashboard'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import Table from './components/Table'


function QuizList() {
    const {name} = useParams();
    return (
    <>
        <Table category={name}/>
    </>
  )
}

export default QuizList