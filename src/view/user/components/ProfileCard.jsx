import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Button } from '@mui/material'
import { FastAverageColor } from 'fast-average-color'
import { Link } from 'react-router-dom'

export default function ProfileCard ({ user }) {
  const imgRef = useRef(null)
  const [bgColor, setBgColor] = useState('#fff6e9') // fallback color

  useEffect(() => {
    if (!user?.avatar) return

    const fac = new FastAverageColor()
    const img = imgRef.current

    const loadImageAndExtractColor = () => {
      fac
        .getColorAsync(img)
        .then(color => setBgColor(color.hex))
        .catch(err => {
          console.error('Color extraction failed:', err)
          setBgColor('#fff6e9') // fallback
        })
    }

    if (img?.complete) {
      loadImageAndExtractColor()
    } else {
      img.onload = loadImageAndExtractColor
    }

    return () => {
      fac.destroy()
    }
  }, [user])

  return (
    <div className='relative flex flex-[.5] bg-primary shadow-lg p-6 rounded-xl  flex-col items-center'>
      <img
        ref={imgRef}
        src={user?.avatar}
        alt='avatar'
        crossOrigin='anonymous'
        style={{ display: 'none' }}
      />
      <div className='h-full items-end w-full'>
        <div className='relative h-[93px] flex justify-center items-end w-full rounded-md bg-[#fff6e9]'>
          <Avatar
            sx={{ position: 'absolute', bottom: '-30px' }}
            src={`${user.avatar}`}
            className='mb-4 border'
            style={{ width: '80px', height: '80px' }}
          />
        </div>
        <div className='text-center mt-[20px]'>
          <p className='text-xl font-bold'>{user.name}</p>
          <p className='text-sm text-gray-600 dark:text-gray-300'>
            {user.email}
          </p>
        </div>
        <div className='mt-7 flex flex-col gap-1 items-start w-full text-sm'>
          <small>
            <strong>Semester:</strong> {user.semester || 'Not Provided'}
          </small>
          <small>
            <strong>Program:</strong> {user.program || 'Not Provided'}
          </small>
          <small>
            <strong>University:</strong> {user.university || 'Not Provided'}
          </small>
          <small>
            <strong>Specialisation:</strong>{' '}
            {user.specialisation || 'Not Provided'}
          </small>
          <small>
            <strong>Joined:</strong> {new Date(user.createdAt).toDateString()}
          </small>
          <small>
            <strong>Status:</strong> Active
          </small>
        </div>
      </div>
      <Link to={'profile'}>
        <Button variant='contained' color='primary' sx={{ fontSize: 9 }}>
          Edit Profile
        </Button>
      </Link>
    </div>
  )
}
