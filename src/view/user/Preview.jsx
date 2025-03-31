import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserDashboard from './Userdashboard';
import { useSelector } from 'react-redux';

function Preview() {
  const { id } = useParams();
  const { solutions } = useSelector(s => s.solution)
  const {data} = useSelector(s=>s.quiz);
  const [currSolution, setCurrSolution] = useState();
  useEffect(() => { 
    const currSolution = solutions.find(solution => solution._id === id);
    const currQuiz =  data;
    setCurrSolution(currSolution);
  }, [id]);
  useEffect(()=>{
    console.log(data)
    console.log(currSolution);
  },[currSolution])
  
  return (
    <div>Preview</div>
  )
}


export default Preview