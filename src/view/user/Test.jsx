import { ExitToApp, Help } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import TestIntro from './TestComponents/TestIntro';

export default function Test() {
  const {id} = useParams();
  // alert(id)
  return (
    <>
      <Header />
      <TestIntro id={id} />
    </>
  )
}
function Header() {
  return (
    <nav className='p-3 shadow-sm flex justify-between' >
      <img src='/assets/logo/A37A874D-8E55-4BCC-BDF4-EBFA65B2F790_1_201_a.jpeg' className='h-10' alt='' />
      <div>
        <IconButton>
          <Help />
        </IconButton>
        <IconButton>
          <ExitToApp/>
        </IconButton>
      </div>
    </nav>
  )
}