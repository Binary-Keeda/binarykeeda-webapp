import { ExitToApp, Help } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import TestIntro from './TestComponents/TestIntro';

export default function Test() {
  const {id} = useParams();
  return (
    <>
      <TestIntro id={id} />
    </>
  )

}